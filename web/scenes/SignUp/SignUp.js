import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PopUpWrapper } from '~/components/sections/PopUpWrapper'
import { miniLogo } from '~/utils/svgImages'
import { Input, Email, Password } from '~/sections/Form'
import { randomNumberInInterval, useAuthenticationToken } from '~/utils/helpers'
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
  checkValidatePassword,
} from '~/utils/validators'

import staticText from '~/assets/text-content/static.json'
import styles from './style.module.scss'

export const SignUp = ({ authImages }) => {
  const [name, setName] = useState('')
  const [nameErrors, setNameErrors] = useState([])
  const [family, setFamily] = useState('')
  const [familyErrors, setFamilyErrors] = useState([])
  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordErrors, setPasswordErrors] = useState([])
  const [passwordErrors2, setPasswordErrors2] = useState([])

  const [congratulationPopup, setCongratulationPopup] = useState(false)

  const token = useAuthenticationToken()

  const index = useMemo(() => randomNumberInInterval(0, authImages.length), [authImages.length])
  const currentImage = authImages[index].asset.url
  const requestUrl = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`
  const requestBody = {
    email: email,
    password: password,
    given_name: name,
    family_name: family,
    connection: 'Username-Password-Authentication',
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setNameErrors(checkValidateName(name))
    setFamilyErrors(checkValidateSurname(family))
    setEmailErrors(checkValidateEmail(email))
    setPasswordErrors(checkValidatePassword(password))
    setPasswordErrors2(checkValidatePassword(password2))
    if (
      !checkValidateName(name).length &&
      !checkValidateSurname(family).length &&
      !checkValidateEmail(email).length &&
      !checkValidatePassword(password).length &&
      !checkValidatePassword(password2).length
    ) {
      if (password !== password2) {
        setPasswordErrors([{ type: 'mismatch', message: 'Password mismatch' }])
        setPasswordErrors2([{ type: 'mismatch', message: 'Password mismatch' }])
      } else {
        setPasswordErrors([])
        setPasswordErrors2([])
        fetch(requestUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            response.ok && setCongratulationPopup(true)
          })
          .then(() => {
            setName('')
            setFamily('')
            setEmail('')
            setPassword('')
            setPassword2('')
          })
          .catch((error) => console.error(error))
      }
    }
  }

  return (
    <>
      <div className={`${styles.wrapper} flex flex-wrap`}>
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
            <h4 className="h4 weight-800 mb-1rem color-darkgray">Create your account</h4>
            <p className="small-text mb-3rem">
              Already have an account?&nbsp;
              <Link href="/api/auth/login">
                <a className="color-red bold login-link">Login</a>
              </Link>
            </p>
            <form onSubmit={submitHandler} className="auth-form flex flex-wrap">
              <Input
                half={true}
                value={name}
                type={'text'}
                id={'name'}
                inputName={'name'}
                placeholder={'First name'}
                checkValidateValue={checkValidateName}
                setValue={setName}
                Errors={nameErrors}
                setErrors={setNameErrors}
              />
              <Input
                half={true}
                value={family}
                type={'text'}
                id={'family'}
                inputName={'family'}
                placeholder={'Last name'}
                checkValidateValue={checkValidateSurname}
                setValue={setFamily}
                Errors={familyErrors}
                setErrors={setFamilyErrors}
              />
              <Email
                half={false}
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
              {/*<Input*/}
              {/*  half={false}*/}
              {/*  value={password}*/}
              {/*  type={'password'}*/}
              {/*  title={*/}
              {/*    'Password should contain at least 8 symbols. Among them should be at least one number, one lowercase letter, one uppercase letter and one symbol from !@#$%^&*'*/}
              {/*  }*/}
              {/*  id={'password'}*/}
              {/*  className={'icon password'}*/}
              {/*  inputName={'password'}*/}
              {/*  placeholder={'Password'}*/}
              {/*  checkValidateValue={checkValidatePassword}*/}
              {/*  setValue={setPassword}*/}
              {/*  Errors={passwordErrors}*/}
              {/*  setErrors={setPasswordErrors}*/}
              {/*/>*/}
              <Password
                value={password}
                title={
                  'Password should contain at least 8 symbols. Among them should be at least one number, one lowercase letter, one uppercase letter and one symbol from !@#$%^&*'
                }
                id={'password'}
                inputName={'password'}
                placeholder={'Enter password'}
                checkValidateValue={checkValidatePassword}
                setValue={setPassword}
                Errors={passwordErrors}
                setErrors={setPasswordErrors}
              />
              <Password
                value={password2}
                title={
                  'Password should contain at least 8 symbols. Among them should be at least one number, one lowercase letter, one uppercase letter and one symbol from !@#$%^&*'
                }
                id={'password2'}
                inputName={'password2'}
                placeholder={'Retry password'}
                checkValidateValue={checkValidatePassword}
                setValue={setPassword2}
                Errors={passwordErrors2}
                setErrors={setPasswordErrors2}
              />
              <button type="submit" className="btn full-red w-100 mt-2x_lg">
                {staticText.btnCreateAccount}
              </button>
            </form>
            <div id="error-message" />
            <div className="captcha-container" />
            <p className="text-center relative" style={{ margin: '1.5rem auto' }}>
              <span className="content-line">or</span>
            </p>
            <Link href="/api/auth/login">
              <button className="btn red w-100 mb-2rem btn-google">Signup with Google</button>
            </Link>
            <p className="small-text">
              By clicking continue, you agree to our&nbsp;
              <Link href="/terms-conditions">
                <a className="bold color-red">Terms of Service</a>
              </Link>
              &nbsp;and&nbsp;
              <Link href="/privacy-policy">
                <a className="bold color-red">Privacy Policy</a>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      {congratulationPopup && (
        <PopUpWrapper handler={() => setCongratulationPopup(false)}>
          <div className="text-center mx-auto pt-9x pb-2x" style={{ maxWidth: '26rem' }}>
            <h3 className="title h3 weight-800 color-darkgray mb-1_5rem">
              Welcome and thank you for joining us!
            </h3>
            <p className="mb-2rem">
              Start using your Mite account to experience charity from a new point of view. Hope you
              enjoy!
            </p>
            <Link href="/api/auth/login">
              <a className="btn full-red">Go to projects</a>
            </Link>
          </div>
        </PopUpWrapper>
      )}
    </>
  )
}
