import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { throttle } from '@fluss/core'
import Link from 'next/link'
import classNames from 'classnames'
import { whenBrowser, getDirection, isMobile } from '~/utils/helpers'
import { Direction } from '~/utils/constants'
import { useGlobalState } from '~/utils/state'
import SVG from '~/components/SVG'
import {
  mainLogo,
  giveHand,
  mailIcon,
  messageIcon,
  phoneIcon,
  locationIcon,
  facebookIcon,
  youtubeIcon,
  instagramIcon,
  linkedInIcon,
} from '~/utils/svgImages'
import {
  Color,
  organizationEmail,
  organizationPhone,
  organizationLocation,
  socialFacebook,
  socialYoutube,
  socialInstagram,
  socialLinkedIn,
} from '~/utils/constants'
import { menu } from '~/utils/data'

import styles from './style.module.scss'
import staticText from '~/assets/text-content/static.json'

export const GuestHeader = ({ resource }) => {
  const { route, pathname } = useRouter()
  const [scrolledHeader, setScrolledHeader] = useState(false)
  const [scrolledScreen, setScrolledScreen] = useState(false)
  const [burgerStatus, setBurgerStatus] = useState(false)
  const [isGiveOpened, setGiveOpened] = useGlobalState('givePopup', false)
  const [isContactOpened, setContactOpened] = useGlobalState('contactPopup', false)

  const headerRef = useRef()
  const menuRef = useRef()

  const transparentHeader =
    route === '/' || route === '/404' || route === '/join-us' || route === '/organization'

  const headerClassNames = classNames(
    'header w-100 small-text absolute',
    styles.header,
    { 'bg-almostWhite color-darkgray': !transparentHeader || scrolledScreen },
    { 'color-white': transparentHeader && route !== '/join-us' && route !== '/404' }
  )

  useEffect(() => {
    if ('window' in globalThis) {
      window.addEventListener('scroll', scrollHandler)
    }
  }, [])
  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = burgerStatus ? 'hidden' : 'initial'
    }
  }, [burgerStatus])

  const intervalFunction = throttle(() => {
    if (headerRef.current) {
      window.scrollY > window.innerHeight - 100 &&
      window.scrollY < document.body.clientHeight - window.innerHeight - 100
        ? setScrolledScreen(true)
        : setScrolledScreen(false)
      window.scrollY > window.innerHeight
        ? (headerRef.current.style.color = 'inherit')
        : headerRef.current.style.removeProperty('color')

      switch (getDirection(window.scrollY)) {
        case Direction.UP:
          setScrolledHeader(false)
          break
        case Direction.DOWN:
          setScrolledHeader(true)
          break
      }
    }
  }, 5)

  const scrollHandler = () => {
    whenBrowser(() => intervalFunction())
  }

  const mainMenu = menu.map(({ title, path }, index) => {
    return (
      <Link key={index} href={path === '/resources' ? `/resources/${resource}` : path}>
        <a
          className={`${
            pathname.includes(path) ? 'active ' : ''
          }menu_link relative transition opacity-80`}
        >
          {title}
        </a>
      </Link>
    )
  })

  return (
    <>
      {isMobile() ? (
        <>
          <header className={`${styles.mobileHeader} header bg-almostWhite`}>
            <div className="container wide flex flex-wrap align-center justify-between">
              <div className="logo">
                {route === '/' ? (
                  <span dangerouslySetInnerHTML={{ __html: mainLogo() }} />
                ) : (
                  <Link href="/">
                    <a dangerouslySetInnerHTML={{ __html: mainLogo() }} />
                  </Link>
                )}
              </div>
              <div className={`menu-wrapper ${burgerStatus ? 'open' : ''}`}>
                <div
                  className={`burger ${burgerStatus ? 'open' : ''}`}
                  onClick={() => setBurgerStatus(!burgerStatus)}
                >
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="menuBlock bg-almostWhite">
                  <nav className="mainMenu">
                    {mainMenu}
                    <Link href="/api/auth/login">
                      <a className="menu_link relative transition opacity-80">
                        {staticText.btnLogin}
                      </a>
                    </Link>
                  </nav>
                  <div className="media-icons">
                    <div className="contacts flex align-center justify-center">
                      <Link href={`mailto:${organizationEmail}`}>
                        <a className="social-item">
                          <SVG content={mailIcon(Color.Red)} size={18} />
                        </a>
                      </Link>
                      {/*<span*/}
                      {/*  className="social-item"*/}
                      {/*  onClick={() => setContactOpened(!isContactOpened)}*/}
                      {/*>*/}
                      {/*  <SVG content={messageIcon(Color.Yellow)} size={18} />*/}
                      {/*</span>*/}
                      <a href={`sms://${organizationPhone}`} className="social-item">
                        <SVG content={messageIcon(Color.Yellow)} size={18} />
                      </a>
                      {/*<span*/}
                      {/*  className="social-item"*/}
                      {/*  onClick={() => setContactOpened(!isContactOpened)}*/}
                      {/*>*/}
                      {/*  <SVG content={phoneIcon(Color.Blue)} size={18} />*/}
                      {/*</span>*/}
                      <a href={`tel:${organizationPhone}`} className="social-item">
                        <SVG content={phoneIcon(Color.Blue)} size={18} />
                      </a>
                      <a
                        className="social-item"
                        href={organizationLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SVG content={locationIcon(Color.Green)} size={18} />
                      </a>
                    </div>
                    <div className="social flex align-center justify-center">
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
                  <div className="authorisation flex align-center">
                    <Link href="/terms-conditions">
                      <a>Terms & Conditions</a>
                    </Link>
                    <Link href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </div>
                </div>
                <button
                  className="btnGive flex align-center justify-center bg-red pointer"
                  onClick={() => setGiveOpened(!isGiveOpened)}
                  dangerouslySetInnerHTML={{ __html: giveHand() }}
                />
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header className={headerClassNames} ref={headerRef}>
            <div className="container wide flex flex-wrap align-center">
              <div className="logo">
                {route === '/' ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: mainLogo(
                        window.scrollY > document.body.clientHeight - window.innerHeight - 100 ||
                          scrolledScreen
                          ? '#F94144'
                          : '#FFFFFF'
                      ),
                    }}
                  />
                ) : (
                  <Link href="/">
                    <a dangerouslySetInnerHTML={{ __html: mainLogo() }} />
                  </Link>
                )}
              </div>
              <nav
                ref={menuRef}
                className={`${route === '/' ? 'menu_white ' : ''}mainMenu transition menu flex-1`}
                //${scrolledHeader ? 'opacity-hidden ' : ''}
              >
                {mainMenu}
              </nav>
              <div className="button-wrapper">
                {scrolledHeader ? (
                  <Link href="/signup">
                    <button className="btnLogin opacity-80">{staticText.btnSignUp}</button>
                  </Link>
                ) : (
                  <Link href="/api/auth/login">
                    {/* test.sample@gmail.com  secret123456^ABC */}
                    <button className="btnLogin opacity-80">{staticText.btnLogin}</button>
                  </Link>
                )}
                <button
                  className={'btn small full-red'}
                  onClick={() => setGiveOpened(!isGiveOpened)}
                >
                  {staticText.btnGive}
                </button>
              </div>
            </div>
          </header>
        </>
      )}
    </>
  )
}
