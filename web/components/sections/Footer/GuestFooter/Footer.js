import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { useUser } from '@auth0/nextjs-auth0'
import { useGlobalState } from '~/utils/state'
import SVG from '~/components/SVG'
import {
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
  organizationLocation,
  socialFacebook,
  socialYoutube,
  socialInstagram,
  socialLinkedIn,
} from '~/utils/constants'
import bgImage from 'public/images/bg-footer.png'

import styles from './style.module.scss'

export const GuestFooter = () => {
  const [isGiveOpened, setGiveOpened] = useGlobalState('givePopup', false)
  const [isContactOpened, setContactOpened] = useGlobalState('contactPopup', false)

  const { user } = useUser()
  const footerClassNames = classNames(
    'footer w-100 index-1 color-white small-text',
    styles.footer,
    { absolute: !user }
  )
  return (
    <>
      <section className={`${styles.beforeFooter} section-indent relative flex`}>
        <Image src={bgImage.src} layout="fill" objectFit="cover" objectPosition="center" />
        <div className="container my-auto index-1">
          <p className="h1 weight-800 color-darkgray mb-3x mb-4x_lg">Do you give?</p>
          <p className="description mb-3x mb-6x_lg">
            There’s a charity experience waiting for you.
          </p>
          <button
            className="btn full-red mb-6x mb-1x_lg"
            onClick={() => setGiveOpened(!isGiveOpened)}
          >
            Get Started
          </button>
        </div>
      </section>
      <footer className={footerClassNames}>
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
              borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
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
