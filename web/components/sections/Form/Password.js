import { useState } from 'react'
import SVG from '~/components/SVG'
import { Color } from '~/utils/constants'
import { eyeIcon, eyeOffIcon, lockIcon, lockOpenIcon } from '~/utils/svgImages'

const inputStyles = {
  paddingLeft: '2rem',
  paddingRight: '2rem',
}
const lockStyles = {
  top: '0.5rem',
  left: '0',
}
const eyeStyles = {
  top: '0.5rem',
  right: '0',
}

export const Password = ({
  half = false,
  placeholder = '',
  className = '',
  id = '',
  inputName = 'password',
  value = '',
  setValue = () => '',
  checkValidateValue = () => null,
  Errors = [],
  setErrors = () => [],
  title = '',
}) => {
  const [typePassword, setTypePassword] = useState(true)
  return (
    <>
      <label
        className={`label relative${half ? ' w50' : ''}${
          Errors.length ? ' error' : ''
        } ${className}`}
      >
        <span className="lockIcon absolute" style={lockStyles}>
          {typePassword ? (
            <SVG content={lockIcon()} size={24} className="opacity-80" />
          ) : (
            <SVG content={lockOpenIcon(Color.Red)} size={24} />
          )}
        </span>
        <input
          type={typePassword ? 'password' : 'text'}
          id={id}
          value={value}
          name={inputName}
          placeholder={placeholder}
          title={title}
          onChange={(e) => {
            setValue(e.target.value)
            setErrors(checkValidateValue(e.target.value))
          }}
          onBlur={(e) => {
            checkValidateValue(e.target.value.trim()).length
              ? setErrors(checkValidateValue(e.target.value.trim()))
              : setValue(e.target.value.trim())
          }}
          style={inputStyles}
        />
        <span
          className="eyeIcon absolute pointer"
          style={eyeStyles}
          onClick={() => setTypePassword(!typePassword)}
        >
          {typePassword ? (
            <SVG content={eyeOffIcon()} size={24} className="opacity-80" />
          ) : (
            <SVG content={eyeIcon()} size={24} />
          )}
        </span>
        <span
          title={title}
          className="errors block absolute small-text color-red"
          style={{ paddingTop: '0.25rem', lineHeight: '1' }}
        >
          {Errors.length !== 0 &&
            Errors.map((error) => {
              return (
                <span key={error.type} className="block">
                  {error.message}
                </span>
              )
            })}
        </span>
      </label>
    </>
  )
}
