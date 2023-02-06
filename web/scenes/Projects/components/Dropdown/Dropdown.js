import SVG from '~/components/SVG'
import { useState, useEffect, useRef } from 'react'

import styles from './style.module.scss'

export const Dropdown = ({ items, selected, handler }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpacity, setIsOpacity] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    setIsOpacity(true)
  }, [])

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert('You clicked outside of me!')
          setIsOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useOutsideAlerter(wrapperRef)

  return (
    <div ref={wrapperRef} className={`${styles.dropdown} dropdown relative color-darkgray`}>
      <div
        className={`${isOpen ? 'visible' : ''} ${
          isOpacity ? 'opacity-80' : ''
        } pointer current transition small-text pl-2x pr-4x`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.image && <SVG content={selected.image} size={16} />}
        {selected.title && (
          <>
            <b>Projects:</b>&nbsp;{selected.title}
          </>
        )}
      </div>
      <ul
        className={`${
          isOpen ? 'visible' : ''
        } select-list transition absolute w-100 bg-white index-1`}
      >
        {items.map((item) => {
          return (
            <li
              key={item.value}
              data-value={item.value}
              onClick={() => {
                handler(item)
                setIsOpen(!isOpen)
                setIsOpacity(false)
              }}
              className={`pointer item transition flex align-center`}
            >
              {item.image && <SVG content={item.image} size={24} />}
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
