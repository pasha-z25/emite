import { useState } from 'react'
import { useGlobalState } from '~/utils/state'
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
  checkValidateSelect,
} from '~/utils/validators'
import { paymentPriceList as priceList, paymentIntervalList as intervalList } from '~/utils/data'
import { Input, Select } from '~/sections/Form'
import { PaymentSelect } from './PaymentSelect'

export const Info = ({ handler }) => {
  const [name, setName] = useGlobalState('paymentUserName', '')
  const [nameErrors, setNameErrors] = useState([])

  const [family, setFamily] = useGlobalState('paymentUserFamily', '')
  const [familyErrors, setFamilyErrors] = useState([])

  const [email, setEmail] = useGlobalState('paymentUserEmail', '')
  const [emailErrors, setEmailErrors] = useState([])

  const [price, setPrice] = useGlobalState('paymentPrice', priceList[1])
  const [priceErrors, setPriceErrors] = useState([])

  const [interval, setInterval] = useGlobalState('paymentPrice', intervalList[2])
  const [intervalErrors, setIntervalErrors] = useState([])

  const nextStep = (step) => {
    setNameErrors(checkValidateName(name))
    setFamilyErrors(checkValidateSurname(family))
    setEmailErrors(checkValidateEmail(email))
    if (
      !checkValidateName(name).length &&
      !checkValidateSurname(family).length &&
      !checkValidateEmail(email).length
    ) {
      handler(step)
    }
  }
  return (
    <>
      <h2 className="h2 title weight-800 relative color-darkgray mb-3x mb-7x_lg pseudo_before_circle_blue pseudo_after_circle_green">
        I want to give
      </h2>
      <PaymentSelect
        half={true}
        list={priceList}
        selected={price}
        Errors={priceErrors}
        checkValidateValue={checkValidateSelect}
        setErrors={setPriceErrors}
        setValue={setPrice}
      />
      <Select
        half={true}
        list={intervalList}
        selected={interval}
        Errors={intervalErrors}
        checkValidateValue={checkValidateSelect}
        setErrors={setIntervalErrors}
        setValue={setInterval}
      />
      <div />
      <Input
        half={true}
        value={name}
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
        id={'surname'}
        inputName={'surname'}
        placeholder={'Last name'}
        checkValidateValue={checkValidateSurname}
        setValue={setFamily}
        Errors={familyErrors}
        setErrors={setFamilyErrors}
      />
      <div />
      <Input
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
      <div className="text-center pt-2x">
        <button type="button" className="btn full-red" onClick={() => nextStep(2)}>
          Next step
        </button>
      </div>
    </>
  )
}
