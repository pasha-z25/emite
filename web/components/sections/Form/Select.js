import { useRef } from 'react'
import { Dropdown } from '~/components/Dropdown'

export const Select = ({
  half = false,
  list,
  selected,
  className = '',
  id = '',
  inputName = 'name',
  checkValidateValue = () => null,
  Errors = [],
  setErrors = () => null,
  setValue = () => null,
}) => {
  const inputRef = useRef()

  const changeCurrentItem = (item) => {
    inputRef.current.value = item.title
    setValue(item)
    setErrors(checkValidateValue(list[0], item))
  }
  return (
    <>
      <label
        className={`label relative${half ? ' w50' : ''}${
          Errors.length ? ' error' : ''
        } ${className}`}
      >
        <input ref={inputRef} type="text" id={id} name={inputName} className="hidden" />
        <Dropdown items={list} selected={selected} handler={changeCurrentItem} />
        <span
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
