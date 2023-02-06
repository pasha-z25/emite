import { useEffect, useRef } from 'react'
import { miniLogo, closeIcon } from '~/utils/svgImages'

import styles from './style.module.scss'

export const PopUpWrapper = ({ handler, children }) => {
  const wrapperRef = useRef(null)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Run action (helper) if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current === event.target) {
          handler()
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
    <div className={`${styles.popupWrapper} flex align-center justify-center`} ref={wrapperRef}>
      <div className="popupWindow flex flex-column align-center justify-center w-100 relative bg-almostWhite border-r20px box-shadow">
        <span className="miteLogo" dangerouslySetInnerHTML={{ __html: miniLogo() }} />
        <span
          className="close absolute pointer transition"
          dangerouslySetInnerHTML={{ __html: closeIcon() }}
          onClick={() => {
            handler()
          }}
        />
        <div className="content w-100">{children}</div>
      </div>
    </div>
  )
}
