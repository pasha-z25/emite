import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Email } from '~/sections/Form'
import { log, randomNumberInInterval, useAuthenticationToken } from '~/utils/helpers'
import { checkValidateEmail } from '~/utils/validators'
import { PopUpWrapper } from '~/components/sections/PopUpWrapper'
import { miniLogo } from '~/utils/svgImages'

import styles from './style.module.scss'

export const RecoverPage = ({ authImages }) => {
  const [congratulationPopup, setCongratulationPopup] = useState(false)

  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])

  const token = useAuthenticationToken()

  const index = useMemo(() => randomNumberInInterval(0, authImages.length), [authImages.length])
  const currentImage = authImages[index].asset.url

  const requestUrl = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`
  const requestBody = {
    email: email,
    client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
    connection: 'Username-Password-Authentication',
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setEmailErrors(checkValidateEmail(email))
    if (!checkValidateEmail(email).length) {
      fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          log('Recover response', response)
          setEmail('')
          response.ok && setCongratulationPopup(true)
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className="image_block relative">
          <Image src={`${currentImage}`} layout="fill" objectFit="cover" objectPosition="center" />
          <Link href="/">
            <a
              className="home-link relative index-1"
              dangerouslySetInnerHTML={{ __html: miniLogo() }}
            />
          </Link>
        </div>
        <div className="form_block flex">
          <div className="form-wrapper my-auto mx-auto">
            <h4 className="h4 weight-800 mb-1rem">Forgot Password?</h4>
            <p className="small-text mb-3rem">
              Please enter the email address you used to create your account, and we’ll send you
              instructions on how to reset your password.
            </p>
            <form onSubmit={submitHandler} className="auth-form flex flex-wrap">
              <Email
                value={email}
                type={'email'}
                id={'email'}
                inputName={'email'}
                placeholder={'Email address'}
                checkValidateValue={checkValidateEmail}
                setValue={setEmail}
                Errors={emailErrors}
                setErrors={setEmailErrors}
              />
              <button type="submit" className="btn full-red w-100 mt-3x">
                Send reset instructions
              </button>
            </form>
          </div>
        </div>
      </div>
      {congratulationPopup && (
        <PopUpWrapper handler={() => setCongratulationPopup(false)}>
          <div
            className="text-center mx-auto"
            style={{ maxWidth: '26rem', padding: '4.5rem 0 1rem 0' }}
          >
            <h3 className="title h3 weight-800 color-darkgray mb-1_5rem">
              Email sent successfully!
            </h3>
            <p className="mb-2rem">Check your inbox and follow the link to change your password.</p>
            <Link href="/">
              <a className="btn full-red">Go to home page</a>
            </Link>
          </div>
        </PopUpWrapper>
      )}
    </>
  )
}
