import { useState } from 'react'
import Image from 'next/image'
import { Input, Email, Password, Phone } from '~/sections/Form'
import SVG from '~/components/SVG'
import { log, getFullDate } from '~/utils/helpers'
import { Color } from '~/utils/constants'
import { giveHandBig, handshakeIcon } from '~/utils/svgImages'
import {
  checkValidateEmail,
  checkValidateName,
  checkValidateSurname,
  checkValidatePassword,
  checkValidatePhone,
} from '~/utils/validators'

import styles from '../../style.module.scss'

export const General = ({ user }) => {
  const [name, setName] = useState(user?.givenName)
  const [nameErrors, setNameErrors] = useState([])
  const [family, setFamily] = useState(user?.familyName)
  const [familyErrors, setFamilyErrors] = useState([])
  const [email, setEmail] = useState(user?.email)
  const [emailErrors, setEmailErrors] = useState([])
  const [password, setPassword] = useState('12345')
  const [passwordErrors, setPasswordErrors] = useState([])
  const [phone, setPhone] = useState(user?.phone)
  const [phoneErrors, setPhoneErrors] = useState([])

  const checkMandatoryFields = () => {
    setNameErrors(checkValidateName(name))
    setFamilyErrors(checkValidateSurname(family))
    setEmailErrors(checkValidateEmail(email))
    setPasswordErrors(checkValidatePassword(password))
    setPhoneErrors(checkValidatePhone(phone))
    if (
      !checkValidateName(name).length &&
      !checkValidateSurname(family).length &&
      !checkValidateEmail(email).length &&
      !checkValidatePassword(password).length &&
      !checkValidatePhone(phone).length
    ) {
      log('Form will be sended', true)
    } else {
      event.preventDefault()
      return false
    }
  }

  return (
    <div className={`${styles.wrapper} flex flex-wrap justify-center`}>
      <div className="card-wrapper w-100">
        <div className="user-card border-r20px bg-white box-shadow text-center pt-5x pb-3x pl-4x pr-4x">
          <div
            className="relative notAbsolute overflow-hidden mx-auto mb-3x"
            style={{ maxWidth: '152px', borderRadius: '50%' }}
          >
            {user?.avatar && <Image src={user?.avatar} alt={user.name} layout="fill" />}
          </div>
          <h4 className="h4 color-darkgray bold mb-5x">
            {user.givenName} {user.familyName}
          </h4>
          <div className="total-gives flex border-top-light border-bottom-light pt-6x pb-6x mb-3x">
            <div className="mites-given flex-1">
              <SVG content={giveHandBig(Color.Yellow)} size={56} />
              <p className="bold color-darkgray mt-2x mb-1x">Mites given</p>
              <p className="small-text">$2000</p>
            </div>
            <div className="people-served border-left-light flex-1">
              <SVG content={handshakeIcon(Color.Blue)} size={56} />
              <p className="bold color-darkgray mt-2x mb-1x">People served</p>
              <p className="small-text">150 people</p>
            </div>
          </div>
          <p className="small-text">
            Registration date: {user?._createdAt && getFullDate(user?._createdAt)}
          </p>
        </div>
      </div>
      <div className="form-wrapper w-100 pt-5x ml-9x">
        <div className="user-data">
          <h4 className="h4 bold color-darkgray mb-6x">Account info</h4>
          <form onSubmit={checkMandatoryFields}>
            <Input
              half={true}
              value={name}
              id={'NAME'}
              inputName={'NAME'}
              placeholder={'Enter first name'}
              checkValidateValue={checkValidateName}
              setValue={setName}
              Errors={nameErrors}
              setErrors={setNameErrors}
            />
            <Input
              half={true}
              value={family}
              id={'COBJ4CF5'}
              inputName={'COBJ4CF5'}
              placeholder={'Enter last name'}
              checkValidateValue={checkValidateSurname}
              setValue={setFamily}
              Errors={familyErrors}
              setErrors={setFamilyErrors}
            />
            <Email
              value={email}
              placeholder={'Enter your e-mail'}
              checkValidateValue={checkValidateEmail}
              setValue={setEmail}
              Errors={emailErrors}
              setErrors={setEmailErrors}
            />
            <Password
              value={password}
              placeholder={'****'}
              checkValidateValue={checkValidatePassword}
              setValue={setPassword}
              Errors={passwordErrors}
              setErrors={setPasswordErrors}
            />
            <Phone
              value={phone}
              placeholder={'Enter your phone'}
              checkValidateValue={checkValidatePhone}
              setValue={setPhone}
              Errors={phoneErrors}
              setErrors={setPhoneErrors}
            />
            <button type="submit" className="btn full-red w-100">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
