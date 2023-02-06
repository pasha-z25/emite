import { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import { useGlobalState } from '~/utils/state'
import { Input } from '~/sections/Form/Input'
import SVG from '~/components/SVG'
import { chevronLeft } from '~/utils/svgImages'
import { checkValidateText, checkValidateZip } from '~/utils/validators'

export const Card = ({ handler }) => {
  const [address, setAddress] = useGlobalState('paymentUserAddress', '')
  const [addressErrors, setAddressErrors] = useState([])

  const [city, setCity] = useGlobalState('paymentUserCity', '')
  const [cityErrors, setCityErrors] = useState([])

  const [zip, setZip] = useGlobalState('paymentUserZip', '')
  const [zipErrors, setZipErrors] = useState([])

  const nextStep = (step) => {
    setAddressErrors(checkValidateText(address))
    setCityErrors(checkValidateText(city))
    setZipErrors(checkValidateZip(zip))
    if (
      !checkValidateText(address).length &&
      !checkValidateText(city).length &&
      !checkValidateZip(zip).length
    ) {
      handler(step)
    }
  }

  return (
    <>
      <h2 className="h2 title relative weight-800 color-darkgray mb-3x mb-7x_lg pseudo_before_circle_blue pseudo_after_circle_green">
        Payment info
      </h2>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="label">
        <CardElement />
      </label>
      <Input
        half={false}
        value={address}
        id={'address'}
        inputName={'address'}
        placeholder={'Billing address'}
        checkValidateValue={checkValidateText}
        setValue={setAddress}
        Errors={addressErrors}
        setErrors={setAddressErrors}
      />
      <Input
        half={true}
        value={city}
        id={'city'}
        inputName={'city'}
        placeholder={'City'}
        checkValidateValue={checkValidateText}
        setValue={setCity}
        Errors={cityErrors}
        setErrors={setCityErrors}
      />
      <Input
        half={true}
        value={zip}
        id={'zip'}
        inputName={'zip'}
        placeholder={'ZIP'}
        checkValidateValue={checkValidateZip}
        setValue={setZip}
        Errors={zipErrors}
        setErrors={setZipErrors}
      />
      <div className="flex align-center justify-between pt-2x">
        <span className="pointer prev-link bold color-darkgray" onClick={() => handler(1)}>
          <SVG content={chevronLeft()} />
          Previous step
        </span>
        <button type="submit" className="btn full-red" onClick={() => nextStep(3)}>
          Confirm
        </button>
      </div>
    </>
  )
}
