import SVG from '~/components/SVG'
import { phoneIcon } from '~/utils/svgImages'

const inputStyles = {
  paddingLeft: '2rem',
}
const iconStyles = {
  top: '0.5rem',
  left: '0',
}

export const Phone = ({
  half = false,
  placeholder = '',
  className = '',
  id = '',
  inputName = 'tel',
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
        className={`label icon tel relative${half ? ' w50' : ''}${
          Errors.length ? ' error' : ''
        } ${className}`}
      >
        <span className="lockIcon absolute" style={iconStyles}>
          <SVG content={phoneIcon()} size={24} />
        </span>
        <input
          type="tel"
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
