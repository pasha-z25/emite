import { useState } from 'react'
import Link from 'next/link'
import { useGlobalState } from '~/utils/state'
import { isMobile } from '~/utils/helpers'
import SVG from '~/components/SVG'
import { chevronDown, settingsIcon, questionAskIcon, logoutIcon } from '~/utils/svgImages'

import styles from './style.module.scss'

export const AccountCard = () => {
  const [user] = useGlobalState('user')
  const [openCard, setOpenCard] = useState(false)
  return user?.sanityUser && isMobile() ? (
    <>
      <div
        className={`${styles.cart} account-card small-text relative flex align-center justify-between`}
      >
        <img className="avatar" src={user?.sanityUser.avatar} alt={user?.sanityUser.givenName} />
      </div>
    </>
  ) : (
    <>
      <div
        className={`${
          styles.cart
        } account-card small-text relative flex align-center justify-between ${
          openCard ? 'open' : ''
        }`}
      >
        <img className="avatar" src={user?.sanityUser.avatar} alt={user?.sanityUser.givenName} />
        <span
          className={`user-name ml-1x flex align-center pr-2x pointer ${openCard ? 'open' : ''}`}
          onClick={() => setOpenCard(!openCard)}
        >
          {user?.sanityUser.givenName} <SVG content={chevronDown()} className="ml-1x transition" />
        </span>
        <ul
          className={`list-none options-list bg-white box-shadow w-100 ${openCard ? 'open' : ''}`}
        >
          <li className="options-list__item transition">
            <Link href="/settings">
              <a className="flex align-center">
                <SVG content={settingsIcon()} size={24} className={'mr-1x'} /> Settings
              </a>
            </Link>
          </li>
          <li className="options-list__item transition">
            <Link href="/support">
              <a className="flex align-center">
                <SVG content={questionAskIcon()} size={24} className={'mr-1x'} />
                Support
              </a>
            </Link>
          </li>
          <li className="options-list__item transition">
            <Link href="/api/auth/logout">
              <a className="flex align-center">
                <SVG content={logoutIcon()} size={24} className={'mr-1x'} /> Logout
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
