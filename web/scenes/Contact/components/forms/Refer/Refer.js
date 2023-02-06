import { useState } from 'react'
import Script from 'next/script'
import { Loader } from '~/components/Loader'
import { gql, useQuery } from '@apollo/client'
import { Input, Textarea, Select } from '~/sections/Form'
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
  checkValidateText,
  checkValidateMessage,
  checkValidateSelect,
} from '~/utils/validators'

let categoryList = [
  {
    value: 'unselected',
    title: 'Project category',
  },
]

export const ReferForm = () => {
  const [name, setName] = useState('')
  const [nameErrors, setNameErrors] = useState([])
  const [family, setFamily] = useState('')
  const [familyErrors, setFamilyErrors] = useState([])
  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])
  const [organization, setOrganization] = useState('')
  const [organizationErrors, setOrganizationErrors] = useState([])
  const [message, setMessage] = useState('')
  const [messageErrors, setMessageErrors] = useState([])
  const [categoryErrors, setCategoryErrors] = useState([])
  const [currentCategory, setCurrentCategory] = useState(categoryList[0])

  const checkMandatoryFields = () => {
    setNameErrors(checkValidateName(name))
    setFamilyErrors(checkValidateSurname(family))
    setEmailErrors(checkValidateEmail(email))
    setOrganizationErrors(checkValidateText(organization))
    setMessageErrors(checkValidateMessage(message))
    setCategoryErrors(checkValidateSelect(categoryList[0], currentCategory))
    if (
      !checkValidateName(name).length &&
      !checkValidateSurname(family).length &&
      !checkValidateEmail(email).length &&
      !checkValidateText(organization).length &&
      !checkValidateMessage(message).length &&
      !checkValidateSelect(categoryList[0], currentCategory).length
    ) {
      document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true)
    } else {
      event.preventDefault()
      return false
    }
  }

  const QUERY = gql`
    query Category {
      allCategory: allProjectCategory {
        value: _id
        title
        image {
          caption
          alt
          asset {
            path
            url
          }
        }
      }
    }
  `
  const { data, loading, error } = useQuery(QUERY)
  if (loading) {
    return <Loader />
  }
  if (error) {
    console.error(error)
    return null
  }
  if (data) {
    const { allCategory } = data
    categoryList = [
      {
        value: 'unselected',
        title: 'Project category',
      },
      ...allCategory,
    ]
  }

  return (
    <>
      <div id="crmWebToEntityForm" className="zcwf_lblLeft crmWebToEntityForm">
        <form
          action="https://crm.zoho.com/crm/WebForm"
          name="WebForm4637093000004722001"
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
            value="30621caa43d9d7ad16f39e80f45103812f8bcc7f23ef90121240c33e4a85d066"
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
              value="Refer a project"
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
          <Select
            half={true}
            id={'COBJ4CF7'}
            inputName={'COBJ4CF7'}
            list={categoryList}
            Errors={categoryErrors}
            checkValidateValue={checkValidateSelect}
            setErrors={setCategoryErrors}
            setValue={setCurrentCategory}
            selected={currentCategory}
          />
          <Textarea
            value={message}
            id={'COBJ4CF9'}
            inputName={'COBJ4CF9'}
            placeholder={'How can we help you fundraise?'}
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
            src="https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=30621caa43d9d7ad16f39e80f45103812f8bcc7f23ef90121240c33e4a85d066gid4f6636d5fcafaeac388f58e3cd59954ab483048d2747c1248782d8c4cbc3f1e9gid0553f79ba9ccf83e1be97f6851b4205dc423a59543a74f960f89ce710133776fgid14f4ec16431e0686150daa43f3210513"
          />
        </form>
      </div>
    </>
  )
}
