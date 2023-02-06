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
    <div ref={wrapperRef} className={`${styles.dropdown} dropdown relative`}>
      <div
        className={`${isOpen ? 'visible' : ''} ${
          isOpacity ? 'opacity-80' : ''
        } pointer current transition pt-1x pb-2x pr-4x`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.title}
      </div>
      <ul
        className={`${
          isOpen ? 'visible' : ''
        } select-list transition absolute w-100 bg-white index-1`}
      >
        {items.map((item, index) => {
          const [image, setImage] = useState('')
          useEffect(() => {
            if (item.image?.asset?.url) {
              fetch(item.image.asset.url)
                .then((response) => response.text())
                .then((svg) => setImage(svg))
            }
          }, [])
          return (
            <li
              key={item.value}
              data-value={item.value}
              onClick={() => {
                handler(item)
                setIsOpen(!isOpen)
                setIsOpacity(false)
              }}
              className={`pointer item transition flex align-center ${
                index ? '' : 'disable hidden'
              }`}
            >
              {item.image?.asset?.url && (
                <>
                  <span className="icon svg-wrap" dangerouslySetInnerHTML={{ __html: image }} />
                </>
              )}
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
