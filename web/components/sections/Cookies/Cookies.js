import Link from 'next/link'
import SVG from '~/components/SVG'
import { cookieIcon } from '~/utils/svgImages'
import styles from './style.module.scss'

export const Cookies = ({ callback }) => {
  return (
    <div className={`${styles.wrapper} flex`}>
      <div className="cookie-icon text-center">
        <SVG content={cookieIcon()} size={40} />
      </div>
      <div className="cookie-text">
        By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to
        enhance site navigation, analyze site usage, and assist in our marketing efforts.{' '}
        <Link href="#">
          <a className="color-red">I would like to modify cookie preferences</a>
        </Link>
      </div>
      <div className="cookie-button text-center">
        <button className="btn full-red small" onClick={callback}>
          I agree
        </button>
      </div>
      <div id="curved-corner-TopLeft" />
    </div>
  )
}
