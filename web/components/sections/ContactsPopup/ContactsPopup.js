import { useEffect } from 'react'
import Link from 'next/link'
import { useGlobalState } from '~/utils/state'
import { PopUpWrapper } from '~/sections/PopUpWrapper'
import { organizationPhone, organizationSchedule } from '~/utils/constants'

import styles from './style.module.scss'

export const ContactsPopup = () => {
  const [isModalOpened, setModalOpened] = useGlobalState('contactPopup', false)
  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = isModalOpened ? 'hidden' : 'initial'
    }
  }, [isModalOpened])
  return (
    isModalOpened && (
      <>
        <PopUpWrapper handler={() => setModalOpened(false)}>
          <div
            className={`${styles.wrapper} relative pseudo_before_circle_green pseudo_after_circle_blue mx-auto pt-8x pb-4x`}
          >
            <h3 className="h3 title weight-800 text-center relative color-darkgray mb-4x pseudo_before_circle_yellow pseudo_after">
              Contact us
            </h3>
            <p className="phone-line flex items-center justify-between bold">
              <span className="color-darkgray">Phone number:</span>
              <span>
                <Link href={`tel:${organizationPhone}`}>
                  <a className="color-red">{organizationPhone}</a>
                </Link>
              </span>
            </p>
            <hr className="mt-3x mb-3x" />
            <p className="address-line flex items-center justify-between">
              <span className="color-darkgray bold">Available:</span>
              <span>{organizationSchedule}</span>
            </p>
          </div>
        </PopUpWrapper>
      </>
    )
  )
}
