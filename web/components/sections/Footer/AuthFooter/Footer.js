import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SVG from '~/components/SVG'
import { useGlobalState } from '~/utils/state'
import { isMobile } from '~/utils/helpers'
import {
  mailIcon,
  messageIcon,
  phoneIcon,
  locationIcon,
  facebookIcon,
  youtubeIcon,
  instagramIcon,
  linkedInIcon,
  playIcon,
  globeIcon,
  giveHand,
  fullBellOffIcon,
  menuIcon,
  fullBellOnIcon,
} from '~/utils/svgImages'
import {
  Color,
  organizationEmail,
  organizationLocation,
  socialFacebook,
  socialYoutube,
  socialInstagram,
  socialLinkedIn,
} from '~/utils/constants'
import { authMenuMobile } from '~/utils/data'

import styles from './style.module.scss'
import { onReadNotification } from '~/scenes/Notifications/components/helpers'

export const AuthFooter = () => {
  const [menuStatus, setMenuStatus] = useState(false)
  const [user] = useGlobalState('user')
  const [isGiveOpened, setGiveOpened] = useGlobalState('givePopup', false)
  const [isContactOpened, setContactOpened] = useGlobalState('contactPopup', false)
  const [notificationCounter, setNewNotificationsCount] = useGlobalState('newNotificationsCounter')
  const [, setNotifications] = useGlobalState('notifications', [])
  const { pathname } = useRouter()

  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = menuStatus ? 'hidden' : 'initial'
    }
  }, [menuStatus])

  const readNotifications = () => {
    onReadNotification(user, setNotifications, setNewNotificationsCount)
  }

  const mainMenu = authMenuMobile.map(({ title, path }, index) => {
    return (
      <Link key={index} href={path}>
        <a className={`${pathname.includes(path) ? 'active ' : ''}menu_link relative transition`}>
          {title}
        </a>
      </Link>
    )
  })

  return isMobile() ? (
    <>
      <footer
        className={`${styles.mobileFooter} footer bg-almostWhite w-100 index-1 small-text pt-1x pb-3x`}
      >
        <div className="container wide">
          <nav className="flex align-center justify-between">
            <Link href="/media">
              <a className="menu_link text-center">
                <SVG content={playIcon()} size={24} />
                <span className="name block">Media</span>
              </a>
            </Link>
            <Link href="/projects">
              <a className="menu_link text-center">
                <SVG content={globeIcon()} size={24} />
                <span className="name block">Projects</span>
              </a>
            </Link>
            <a className="menu_link text-center" onClick={() => setGiveOpened(!isGiveOpened)}>
              <SVG content={giveHand(Color.DarkGray)} size={24} />
              <span className="name block">Give</span>
            </a>
            <Link href="/notifications">
              <a onClick={readNotifications} className="menu_link text-center">
                <SVG
                  content={notificationCounter ? fullBellOnIcon() : fullBellOffIcon()}
                  size={24}
                />
                <span className="name block">Notifications</span>
              </a>
            </Link>
            <a className="menu_link text-center" onClick={() => setMenuStatus(!menuStatus)}>
              <SVG content={menuIcon(`${menuStatus ? Color.Red : Color.DarkGray}`)} size={24} />
              <span className={`name block ${menuStatus ? 'color-red' : ''}`}>Menu</span>
            </a>
          </nav>
        </div>
        <div className={`menu-wrapper bg-almostWhite ${menuStatus ? 'open' : ''}`}>
          <div className="menuBlock container">
            <nav className="mainMenu">{mainMenu}</nav>
            <div className="media-icons">
              <div className="contacts flex align-center justify-center pt-3x pb-1x">
                <Link href={`mailto:${organizationEmail}`}>
                  <a className="social-item">
                    <SVG content={mailIcon(Color.Red)} size={18} />
                  </a>
                </Link>
                <span className="social-item" onClick={() => setContactOpened(!isContactOpened)}>
                  <SVG content={messageIcon(Color.Yellow)} size={18} />
                </span>
                <span className="social-item" onClick={() => setContactOpened(!isContactOpened)}>
                  <SVG content={phoneIcon(Color.Blue)} size={18} />
                </span>
                <a
                  className="social-item"
                  href={organizationLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SVG content={locationIcon(Color.Green)} size={18} />
                </a>
              </div>
              <div className="social flex align-center justify-center pt-1x pb-3x">
                <Link href={socialFacebook}>
                  <a target="_blank" rel="noopener noreferrer" className="social-item">
                    <SVG content={facebookIcon('#3B5998')} size={24} />
                  </a>
                </Link>
                <Link href={socialYoutube}>
                  <a target="_blank" rel="noopener noreferrer" className="social-item">
                    <SVG content={youtubeIcon('#FF0000')} size={24} />
                  </a>
                </Link>
                <Link href={socialInstagram}>
                  <a target="_blank" rel="noopener noreferrer" className="social-item">
                    <SVG content={instagramIcon('#CB38A6')} size={24} />
                  </a>
                </Link>
                <Link href={socialLinkedIn}>
                  <a target="_blank" rel="noopener noreferrer" className="social-item">
                    <SVG content={linkedInIcon('#0077B5')} size={24} />
                  </a>
                </Link>
              </div>
            </div>
            <div className="text-center pt-3x pb-3x">
              <Link href="/api/auth/logout">
                <a className="logout-link relative transition color-red">Logout</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  ) : (
    <>
      <footer className={`${styles.footer} footer w-100 index-1 small-text`}>
        <div className="container wide">
          <div className="flex flex-wrap align-center justify-between">
            <div className="contacts flex">
              <Link href={`mailto:${organizationEmail}`}>
                <a className="social-item">
                  <SVG content={mailIcon(Color.Red)} size={18} />
                </a>
              </Link>
              <span className="social-item" onClick={() => setContactOpened(!isContactOpened)}>
                <SVG content={messageIcon(Color.Yellow)} size={18} />
              </span>
              <span className="social-item" onClick={() => setContactOpened(!isContactOpened)}>
                <SVG content={phoneIcon(Color.Blue)} size={18} />
              </span>
              <a
                className="social-item"
                href={organizationLocation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVG content={locationIcon(Color.Green)} size={18} />
              </a>
            </div>
            <div className="social flex">
              <Link href={socialFacebook}>
                <a target="_blank" rel="noopener noreferrer" className="social-item">
                  <SVG content={facebookIcon('#3B5998')} size={24} />
                </a>
              </Link>
              <Link href={socialYoutube}>
                <a target="_blank" rel="noopener noreferrer" className="social-item">
                  <SVG content={youtubeIcon('#FF0000')} size={24} />
                </a>
              </Link>
              <Link href={socialInstagram}>
                <a target="_blank" rel="noopener noreferrer" className="social-item">
                  <SVG content={instagramIcon('#CB38A6')} size={24} />
                </a>
              </Link>
              <Link href={socialLinkedIn}>
                <a target="_blank" rel="noopener noreferrer" className="social-item">
                  <SVG content={linkedInIcon('#0077B5')} size={24} />
                </a>
              </Link>
            </div>
          </div>
          <hr
            className="mt-9x mb-1x mt-3x_lg mb-3x_lg"
            style={{
              borderBottom: '1px solid rgba(75, 74, 91, 0.2)',
              borderTop: 'none',
            }}
          />
          <div className="flex flex-wrap align-center justify-between opacity-80">
            <p className="copyright">
              © {new Date().getFullYear()} Landify UI Kit. All rights reserved
            </p>
            <p className="footer-links">
              <Link href="/terms-conditions">
                <a>Terms & Conditions</a>
              </Link>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
