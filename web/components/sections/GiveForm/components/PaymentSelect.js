import { useRef } from 'react'
import { Dropdown } from '~/components/Dropdown'

export const PaymentSelect = ({
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
    inputRef.current.value = item.value
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
        <span className={selected.value === 'other' ? 'flex' : 'flex hidden'}>
          <span style={{ borderBottom: '1px solid rgba(75, 74, 91, 0.2)' }}>$</span>
          <input
            ref={inputRef}
            type="number"
            id={id}
            name={inputName}
            className={selected.value === 'other' ? '' : 'hidden'}
            style={{
              paddingTop: 0,
              paddingBottom: '1rem',
            }}
          />
        </span>
        {selected.value !== 'other' && (
          <Dropdown items={list} selected={selected} handler={changeCurrentItem} />
        )}
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
