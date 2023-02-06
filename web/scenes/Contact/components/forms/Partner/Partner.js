import { useState } from 'react'
import Script from 'next/script'
import { Input, Textarea } from '~/sections/Form'
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
  checkValidateText,
  checkValidateMessage,
} from '~/utils/validators'

export const PartnerForm = () => {
  const [name, setName] = useState('')
  const [nameErrors, setNameErrors] = useState([])
  const [family, setFamily] = useState('')
  const [familyErrors, setFamilyErrors] = useState([])
  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])
  const [organization, setOrganization] = useState('')
  const [organizationErrors, setOrganizationErrors] = useState([])
  const [website, setWebsite] = useState('')
  const [websiteErrors, setWebsiteErrors] = useState([])
  const [message, setMessage] = useState('')
  const [messageErrors, setMessageErrors] = useState([])

  const checkMandatoryFields = () => {
    setNameErrors(checkValidateName(name))
    setFamilyErrors(checkValidateSurname(family))
    setEmailErrors(checkValidateEmail(email))
    setOrganizationErrors(checkValidateText(organization))
    setWebsiteErrors(checkValidateText(website))
    setMessageErrors(checkValidateMessage(message))
    if (
      !checkValidateName(name).length &&
      !checkValidateSurname(family).length &&
      !checkValidateEmail(email).length &&
      !checkValidateText(organization).length &&
      !checkValidateText(website).length &&
      !checkValidateMessage(message).length
    ) {
      document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true)
    } else {
      event.preventDefault()
      return false
    }
  }

  return (
    <>
      <div id="crmWebToEntityForm" className="zcwf_lblLeft crmWebToEntityForm">
        <form
          action="https://crm.zoho.com/crm/WebForm"
          name="WebForm4637093000004723038"
          method="POST"
          onSubmit={checkMandatoryFields}
          acceptCharset="UTF-8"
        >
          <input
            type="text"
            style={{ display: 'none' }}
            name="xnQsjsdp"
            value="4f6636d5fcafaeac388f58e3cd59954ab483048d2747c1248782d8c4cbc3f1e9"
            readOnly={true}
          />
          <input type="hidden" name="zc_gad" id="zc_gad" value="" readOnly={true} />
          <input
            type="text"
            style={{ display: 'none' }}
            name="xmIwtLD"
            value="30621caa43d9d7ad16f39e80f451038130b7fbe8961174a0638fb5af4f1e6158"
            readOnly={true}
          />
          <input
            type="text"
            style={{ display: 'none' }}
            name="actionType"
            value="Q3VzdG9tTW9kdWxlNA=="
            readOnly={true}
          />
          <input
            type="text"
            style={{ display: 'none' }}
            name="returnURL"
            value="https&#x3a;&#x2f;&#x2f;mite-fawn.vercel.app&#x2f;contact&#x3f;success&#x3d;true"
            readOnly={true}
          />
          {/* <!-- Do not remove this code. --> */}
          <label className="hidden">
            <input
              type="text"
              id="COBJ4CF11"
              name="COBJ4CF11"
              maxLength="255"
              placeholder="Send date"
              value={new Date().toLocaleString()}
              readOnly={true}
            />
          </label>
          <label className="hidden">
            <input
              type="text"
              id="COBJ4CF6"
              name="COBJ4CF6"
              maxLength="255"
              placeholder="Selected form category"
              value="Partner with Us"
              readOnly={true}
            />
          </label>
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
          <Input
            value={email}
            type={'email'}
            id={'COBJ4CF3'}
            inputName={'COBJ4CF3'}
            placeholder={'Enter your e-mail'}
            checkValidateValue={checkValidateEmail}
            setValue={setEmail}
            Errors={emailErrors}
            setErrors={setEmailErrors}
          />
          <Input
            half={true}
            value={organization}
            id={'COBJ4CF1'}
            inputName={'COBJ4CF1'}
            placeholder={'Organization name'}
            checkValidateValue={checkValidateText}
            setValue={setOrganization}
            Errors={organizationErrors}
            setErrors={setOrganizationErrors}
          />
          <Input
            half={true}
            value={website}
            id={'COBJ4CF10'}
            inputName={'COBJ4CF10'}
            placeholder={'Organization website'}
            checkValidateValue={checkValidateText}
            setValue={setWebsite}
            Errors={websiteErrors}
            setErrors={setWebsiteErrors}
          />
          <Textarea
            value={message}
            id={'COBJ4CF9'}
            inputName={'COBJ4CF9'}
            placeholder={'Please tell us about your charity...'}
            checkValidateValue={checkValidateMessage}
            setValue={setMessage}
            Errors={messageErrors}
            setErrors={setMessageErrors}
          />
          <button
            id="formsubmit"
            type="submit"
            title="Submit"
            className="btn full-red wide formsubmit zcwf_button"
          >
            Send message
          </button>
          <input
            type="reset"
            className="zcwf_button hidden"
            name="reset"
            value="Reset"
            title="Reset"
          />
          <Script
            id="wf_anal"
            src="https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=30621caa43d9d7ad16f39e80f451038130b7fbe8961174a0638fb5af4f1e6158gid4f6636d5fcafaeac388f58e3cd59954ab483048d2747c1248782d8c4cbc3f1e9gid0553f79ba9ccf83e1be97f6851b4205dc423a59543a74f960f89ce710133776fgid14f4ec16431e0686150daa43f3210513"
          />
        </form>
      </div>
    </>
  )
}
