import SVG from '~/components/SVG'
import { mailOpenIcon, mailCloseIcon } from '~/utils/svgImages'

const inputStyles = {
  paddingLeft: '2rem',
}
const iconStyles = {
  top: '0.5rem',
  left: '0',
}

export const Email = ({
  half = false,
  placeholder = '',
  className = '',
  id = '',
  inputName = 'email',
  value = '',
  setValue = () => '',
  checkValidateValue = () => null,
  Errors = [],
  setErrors = () => [],
  title = '',
}) => {
  return (
    <>
      <label
        className={`label relative${half ? ' w50' : ''}${
          Errors.length ? ' error' : ''
        } ${className}`}
      >
        <span className="lockIcon absolute opacity-80" style={iconStyles}>
          {Errors.length ? (
            <SVG content={mailCloseIcon()} size={24} />
          ) : (
            <SVG content={mailOpenIcon()} size={24} />
          )}
        </span>
        <input
          type="email"
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
