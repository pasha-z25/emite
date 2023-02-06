import parsePhoneNumber from 'libphonenumber-js'
import { log } from '~/utils/helpers'

const validateName = (name) => /^[а-яА-Яa-zA-Z._\s-]{2,30}$/.test(name)
const validateEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
const validatePassword = (password) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\d\w!@#$%^&*]{8,}$/.test(password)
const validateZip = (zip) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)

const checkValidateName = (name) => {
  let nameErrors = []
  if (name === '') {
    nameErrors = [{ type: 'empty', message: 'Please enter your first name' }]
  } else if (name.length < 2) {
    nameErrors = [{ type: 'short', message: 'Too short' }]
  } else if (name.length > 30) {
    nameErrors = [{ type: 'long', message: 'Too long' }]
  } else if (!validateName(name)) {
    nameErrors = [{ type: 'invalid', message: 'Enter a valid first name' }]
  } else {
    nameErrors = []
  }
  return nameErrors
}
const checkValidateSurname = (surname) => {
  let familyErrors = []
  if (surname === '') {
    familyErrors = [{ type: 'empty', message: 'Please enter your last name' }]
  } else if (surname.length < 2) {
    familyErrors = [{ type: 'short', message: 'Too short' }]
  } else if (surname.length > 30) {
    familyErrors = [{ type: 'long', message: 'Too long' }]
  } else if (!validateName(surname)) {
    familyErrors = [{ type: 'invalid', message: 'Enter a valid last name' }]
  } else {
    familyErrors = []
  }
  return familyErrors
}
const checkValidateEmail = (email) => {
  let emailErrors = []
  if (email === '') {
    emailErrors = [{ type: 'empty', message: 'Please enter your email' }]
  } else if (!validateEmail(email)) {
    emailErrors = [{ type: 'invalid', message: 'Enter a valid email' }]
  } else {
    emailErrors = []
  }
  return emailErrors
}
const checkValidatePassword = (password) => {
  let passwordErrors = []
  if (password === '') {
    passwordErrors = [{ type: 'empty', message: 'Empty field' }]
  } else if (!validatePassword(password)) {
    passwordErrors = [{ type: 'invalid', message: 'Enter a valid password' }]
  } else {
    passwordErrors = []
  }
  return passwordErrors
}
const checkValidateText = (text) => {
  let textErrors = []
  if (text === '') {
    textErrors = [{ type: 'empty', message: 'The field must be not empty' }]
  } else if (text.length < 2) {
    textErrors = [{ type: 'short', message: 'Too short' }]
  } else if (text.length > 100) {
    textErrors = [{ type: 'long', message: 'Too long' }]
  } else {
    textErrors = []
  }
  return textErrors
}
const checkValidateMessage = (message) => {
  let messageErrors = []
  if (message === '') {
    messageErrors = [{ type: 'empty', message: 'Please enter your message' }]
  } else if (message.length > 1000) {
    messageErrors = [{ type: 'long', message: 'Too long' }]
  } else {
    messageErrors = []
  }
  return messageErrors
}
const checkValidateZip = (zip) => {
  let zipErrors = []
  if (zip === '') {
    zipErrors = [{ type: 'empty', message: 'Please enter your ZIP' }]
  } else if (!validateZip(zip)) {
    zipErrors = [{ type: 'invalid', message: 'Enter a valid ZIP' }]
  } else {
    zipErrors = []
  }
  return zipErrors
}
const checkValidateSelect = (initial, value) => {
  let selectErrors = []
  if (JSON.stringify(initial) === JSON.stringify(value)) {
    selectErrors = [{ type: 'unselected', message: 'Please, select some value' }]
  } else {
    selectErrors = []
  }
  return selectErrors
}
const checkValidatePhone = (phone) => {
  let phoneErrors = []
  const phoneNumber = parsePhoneNumber(phone)
  if (phone === '') {
    // phoneErrors = [{ type: 'empty', message: 'Please enter your phone' }]
    phoneErrors = []
  } else if (phoneNumber?.isValid()) {
    phoneErrors = []
  } else {
    phoneErrors = [{ type: 'invalid', message: 'Invalid phone number' }]
  }
  log('checkValidatePhone input', phone)
  log('checkValidatePhone result', phoneNumber)
  log('checkValidatePhone valid', phoneNumber?.isValid())
  return phoneErrors
}

export {
  validateName,
  validateEmail,
  validatePassword,
  validateZip,
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
  checkValidatePassword,
  checkValidateText,
  checkValidateMessage,
  checkValidateZip,
  checkValidateSelect,
  checkValidatePhone,
}
