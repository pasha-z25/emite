export const Input = ({
  half = false,
  placeholder = '',
  className = '',
  id = '',
  inputName = 'name',
  type = 'text',
  value,
  setValue,
  checkValidateValue,
  Errors,
  setErrors,
  title = '',
  style = {},
}) => {
  return (
    <>
      <label
        className={`label relative${half ? ' w50' : ''}${
          Errors.length ? ' error' : ''
        } ${className}`}
        style={style}
      >
        <input
          type={type}
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
