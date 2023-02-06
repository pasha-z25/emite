import { useState, useEffect, useMemo } from 'react'
import lozad from 'lozad'
import Link from 'next/link'
import { randomNumberInInterval, log } from '~/utils/helpers'
import { validateEmail, validatePassword } from '~/utils/validators'

import styles from './style.module.scss'

let token = ''

export const LogInPage = ({ authImages }) => {
  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState([])

  useEffect(() => {
    const observer = lozad() // lazy loads elements with default selector as '.lozad'
    observer.observe()

    fetch(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}`,
        audience: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/`,
      }),
    })
      .then((response) => {
        // response.json()
        log(response)
      })
      // .then(({ access_token }) => {
      //   token = access_token
      //   console.log('access_token is updated')
      // })
      .catch((error) => console.error(error))
  }, [])

  const index = useMemo(() => randomNumberInInterval(0, authImages.length), [authImages.length])
  const currentImage = authImages[index].asset.url

  const checkValidateEmail = (email) => {
    if (email === '') {
      setEmailErrors([{ type: 'empty', message: 'Empty field' }])
      return false
    } else if (!validateEmail(email)) {
      setEmailErrors([{ type: 'invalid', message: 'Enter a valid email' }])
      return false
    } else {
      setEmailErrors([])
      // setEmail(email)
      return email
    }
  }
  const checkValidatePassword = (password) => {
    if (password === '') {
      setPasswordErrors([{ type: 'empty', message: 'Empty field' }])
      return false
    } else if (!validatePassword(password)) {
      setPasswordErrors([{ type: 'invalid', message: 'Enter a valid password' }])
      return false
    } else {
      setPasswordErrors([])
      // setPassword(password)
      return password
    }
  }

  const requestUrl = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`
  const requestBody = {
    client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
    username: email,
    password: password,
    // connection: 'Username-Password-Authentication',
    // scope: 'openid',
    grant_type: 'password',
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(requestBody)
    if (checkValidateEmail(email) && checkValidatePassword(password)) {
      fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((result) => {
          setEmail('')
          setPassword('')
          console.log(result)
        })
        .catch((error) => console.log(error))
    }
  }

  const authGoogleHandler = () => console.log('auth0')

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className="image_block lozad"
          // data-background-image={currentImage}
          style={{ backgroundImage: `url(${currentImage})` }}
        >
          <Link className="home-link" href="/">
            <a>
              <svg
                width="54"
                height="40"
                viewBox="0 0 54 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50.3447 2.70347C44.0861 -2.63082 33.8368 1.29202 27.0306 6.70341C20.2244 1.29099 9.97515 -2.63082 3.7165 2.70347C-2.54216 8.03776 0.117567 17.8428 5.67284 25.4511C9.44095 30.6126 13.4316 35.0526 18.6587 39.5788C19.0043 39.878 19.5282 39.5182 19.3652 39.0905C18.5511 36.9502 17.5873 35.0628 16.6091 33.1775C14.3738 28.8671 11.8618 24.7376 11.2702 23.6973C10.6775 22.6569 9.61936 20.6657 10.4437 19.684C11.3378 18.621 13.245 19.9543 14.6609 21.4213C16.078 22.8882 22.8349 30.0184 27.3505 30.4543C31.8661 30.8902 36.1602 26.6867 37.9679 22.0175C39.3264 18.5079 40.1067 14.1605 40.2636 13.1346C40.4195 12.1086 41.2561 11.2061 41.9995 11.278C42.7429 11.35 43.4821 12.0572 43.761 13.3566C44.0399 14.656 44.1671 21.1458 42.2866 25.7081C40.7445 29.4489 36.6965 35.5799 34.574 39.1594C34.3187 39.5891 34.8621 40.0486 35.2415 39.7217C40.5497 35.1461 44.5823 30.6671 48.3904 25.4511C53.9436 17.8428 56.6044 8.03776 50.3447 2.70347ZM27.0306 25.9445C23.8972 25.9445 21.3564 23.3971 21.3564 20.2555C21.3564 17.114 23.8962 14.5666 27.0306 14.5666C30.164 14.5666 32.7048 17.114 32.7048 20.2555C32.7048 23.3971 30.164 25.9445 27.0306 25.9445Z"
                  fill="#F94144"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="form_block flex">
          <div className="form-wrapper my-auto mx-auto">
            <h4 className="h4 weight-800 mb-1rem">Create your account</h4>
            <p className="small-text mb-3rem">
              Already have an account?&nbsp;
              <Link href="/api/auth/login">
                <a className="color-red bold login-link">Login</a>
              </Link>
            </p>
            <form onSubmit={submitHandler} className="auth-form">
              <label className={`label email relative ${emailErrors.length ? 'error' : ''}`}>
                <input
                  type="email"
                  placeholder="Email"
                  onBlur={(e) => {
                    checkValidateEmail(e.target.value.trim())
                      ? setEmail(e.target.value.trim())
                      : false
                  }}
                />
                <span className="errors absolute small-text color-red">
                  {emailErrors.length !== 0 &&
                    emailErrors.map((error) => {
                      return (
                        <span key={error.type} className="block">
                          {error.message}
                        </span>
                      )
                    })}
                </span>
              </label>
              <label className={`label password relative ${passwordErrors.length ? 'error' : ''}`}>
                <input
                  type="password"
                  placeholder="Password"
                  onBlur={(e) => {
                    checkValidatePassword(e.target.value.trim())
                      ? setPassword(e.target.value.trim())
                      : false
                  }}
                  // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\d\w!@#$%^&*]{8,}$"
                  title="Password should contain at least 8 symbols. Among them should be at least one number, one lowercase letter, one uppercase letter and one symbol from !@#$%^&*"
                />
                <span
                  className="errors absolute small-text color-red"
                  title="Password should contain at least 8 symbols. Among them should be at least one number, one lowercase letter, one uppercase letter and one symbol from !@#$%^&*"
                >
                  {passwordErrors.length !== 0 &&
                    passwordErrors.map((error) => {
                      return (
                        <span key={error.type} className="block">
                          {error.message}
                        </span>
                      )
                    })}
                </span>
              </label>
              <p className="mb-1rem" />
              {/* <p>
                Password should contain at least 8 symbols. Among them should be at least one number,
                one lowercase letter, one uppercase letter and one symbol from <code>!@#$%^&*</code>
              </p> */}
              <button type="submit" className="btn full-red w-100">
                Login
              </button>
            </form>
            <div id="error-message" />
            <div className="captcha-container" />
            <p className="text-center relative" style={{ margin: '1.5rem auto' }}>
              <span className="content-line">or</span>
            </p>
            {/* <Link href="/api/auth/login"><a>Login width google</a></Link> */}
            <button onClick={authGoogleHandler} className="btn red w-100">
              Login width google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
