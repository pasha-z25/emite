import { useState, useEffect } from 'react'
import axios from 'axios'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useGlobalState } from '~/utils/state'
import { log } from '~/utils/helpers'
import getStripe from '~/utils/get-stripe'
import { PopUpWrapper } from '~/sections/PopUpWrapper'
import { Info } from './components/PaymentInfo'
import { Card } from './components/PaymentCard'
import { Result } from './components/PaymentResult'

import styles from './style.module.scss'

export const GiveForm = () => {
  const [paymentStep, setPaymentStep] = useState(1)
  const [isModalOpened, setModalOpened] = useGlobalState('givePopup', false)
  const [name] = useGlobalState('paymentUserName')
  const [family] = useGlobalState('paymentUserFamily')
  const [email] = useGlobalState('paymentUserEmail')
  const [price] = useGlobalState('paymentPrice') // priceList[1]
  const [interval] = useGlobalState('paymentPrice') // intervalList[2]
  const [address] = useGlobalState('paymentUserAddress')
  const [city] = useGlobalState('paymentUserCity')
  const [zip] = useGlobalState('paymentUserZip')

  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = isModalOpened ? 'hidden' : 'initial'
    }
  }, [isModalOpened])

  const paymentProduct = {
    productApiId: 'price_1Jw1gABenGfWYCsWEWMMk3bK',
    // email: email,
    // name: `${name} ${family}`,
    // paymentFrequency: interval.value,
    // price: price.value, // product.price
    // quantity: interval.value, // price.value
    // address,
    // city,
    // zip,
  }

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id },
    } = await axios.post('/api/stripe/checkout_sessions', {
      item: paymentProduct,
    })

    // Redirect to checkout
    const stripe = await getStripe()
    await stripe.redirectToCheckout({ sessionId: id })
  }

  const stripe = useStripe()
  const elements = useElements()
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: 'allantest11@test.com',
        name: 'Pasha Zubak',
      },
      metadata: {
        paymentApiId: 'paymentApiId',
      },
    })

    if (error) {
      console.log('[error]', error)
    } else {
      log('[PaymentMethod]', paymentMethod)
    }
    log('metadata', paymentMethod.metadata)

    // const result = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: 'http://localhost:3000',
    //   },
    // })
    // console.log('[result]', result)
  }

  return (
    isModalOpened && (
      <>
        <PopUpWrapper handler={() => setModalOpened(false)}>
          <div
            className={`${styles.formWrapper} form-wrapper mx-auto relative pseudo_before`}
            style={{ maxWidth: '26rem' }}
          >
            <form className="pt-5x pt-9x_lg pb-1x pb-4x_lg" onSubmit={handleSubmit}>
              <div style={{ display: paymentStep === 1 ? 'block' : 'none' }}>
                <Info handler={setPaymentStep} />
              </div>
              <div style={{ display: paymentStep === 2 ? 'block' : 'none' }}>
                <Card handler={setPaymentStep} />
              </div>
              <div style={{ display: paymentStep === 3 ? 'block' : 'none' }}>
                <Result />
              </div>
            </form>
          </div>
        </PopUpWrapper>
      </>
    )
  )
}
