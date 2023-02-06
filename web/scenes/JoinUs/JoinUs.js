import { useEffect } from 'react'
import Link from 'next/link'
import useResize from 'use-resizing'
import { useGlobalState } from '~/utils/state'
import { Color, socialAmazon } from '~/utils/constants'
import SVG from '~/components/SVG'
import {
  amazonIcon,
  chevronRight,
  monetizationIcon,
  moneyBagIcon,
  navigationIcon,
  partnerIcon,
  partyIcon,
  accountPlusIcon,
} from '~/utils/svgImages'
// import { Logos } from '~/sections/partnersLogo'

import styles from './style.module.scss'

export const JoinUsPage = () => {
  const [isGiveOpened, setGiveOpened] = useGlobalState('givePopup', false)
  useEffect(() => {
    import('wowjs').then(({ WOW }) => {
      new WOW().init()
    })
  }, [])
  const screenSize = useResize()
  return (
    <>
      <section className={`${styles.mainBanner} section-indent relative h-100vh flex`}>
        <div className="container text-center my-auto index-1 relative">
          <h1 className="h1 title uppercase weight-800 color-red relative max-content mx-auto mb-3x mb-4x_lg">
            JOIN OUR <br /> GIVING COMMUNITY
          </h1>
          <p className="mx-auto description relative mw-50rem mb-5x mb-7x_lg">
            Join our community of givers, people like you who are passionate about helping the needy
            & transforming communities across the globe. When we joyfully give with all our might,
            we positively impact our world, leaving a beneficial legacy today & generations to come.
          </p>
          <div className="form-wrapper">
            <form className="fake-form mx-auto relative">
              <label className="label">
                <input className="input" type="email" placeholder="Enter your email" />
              </label>
              <Link href="/api/auth/login">
                {screenSize.width >= 992 ? (
                  <button type="button" className="btnSignupBig btn full-red small">
                    Signup
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btnSignupSmall flex align-center justify-center bg-red pointer"
                  >
                    <SVG content={accountPlusIcon()} size={24} />
                  </button>
                )}
              </Link>
            </form>
          </div>
        </div>
      </section>
      <section className={`${styles.joinMighty} section-indent`}>
        <div className="container">
          <div className="row row__lg-revers">
            <div className="col col-2__lg mb-4x mb-1x_lg">
              <img src="/images/image-274.png" alt="Our team" />
            </div>
            <div className="col col-2__lg">
              <div className="wrapper relative wow fadeInUp">
                <h2 className="h2 weight-800 color-darkgray mb-2x mb-4x_lg">
                  Join the <br />
                  Mighty Fund
                </h2>
                <p className="mb-2x mb-6x_lg">
                  At Mite, we ensure that 100% of project donations are used on projects alone. To
                  support our operational costs, we created the Mighty Fund, which allows us to keep
                  spreading the joy of giving. Join the Mighty Fund givers who believe in our
                  mission, and become a champion for charity today!
                </p>
                <button className="btn darkgray" onClick={() => setGiveOpened(!isGiveOpened)}>
                  Give your Mite
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*
      <section className={styles.partnerUs}>
        <div className="container text-center">
          <div className="wow fadeInUp">
            <h2 className="h2 weight-800 title relative color-darkgray mb-2x mb-4x_lg">
              Partner <span className="color-red">us</span>
            </h2>
            <p className="mx-auto mw-50rem description relative mb-4x mb-9x_lg">
              We love connecting with fantastic humanitarian organizations worldwide, and we always
              enjoy when our giving community brings worthy causes to our attention. That&apos;s
              where you come in! Give your Mite by referring an organization or charity you are
              familiar or affiliated with so that our team can get in touch.
            </p>
          </div>
          <div className="flex flex-wrap justify-between logos mb-3x_lg">
            <Logos />
          </div>
          <Link href="/contact?category=partner">
            <a className="btn full-red">Get involved</a>
          </Link>
        </div>
      </section>
      */}
      <section className={`${styles.supportUs} section-indent`}>
        <div className="container">
          <div className="mx-auto mw-50rem">
            <div className="wow fadeInUp">
              <h2 className="h2 weight-800 title relative text-center color-darkgray mb-2x mb-4x_lg">
                Other ways to <span className="color-red">Support us</span>
              </h2>
              <p className="text-center description relative mb-3rem">
                Discover all the ways you can get involved
              </p>
            </div>
            <div className="card">
              <Link href="/contact?category=partner">
                <a className="item flex align-center">
                  <SVG content={partnerIcon('#2971DD')} size={32} />
                  <span className="flex-1 h4 item-title bold color-darkgray pl-2x">
                    Partner with us
                  </span>
                  <span className="more bold color-red transition">Get involved</span>
                  <SVG content={chevronRight()} size={18} className={'ml-1x'} />
                </a>
              </Link>
              <Link href="/contact?category=refer">
                <a className="item flex align-center">
                  <SVG content={navigationIcon(Color.Red)} size={32} />
                  <span className="flex-1 h4 item-title bold color-darkgray pl-2x">
                    Refer a project
                  </span>
                  <span className="more bold color-red transition">Get started</span>
                  <SVG content={chevronRight()} size={18} className={'ml-1x'} />
                </a>
              </Link>
              <Link href="/contact?category=hostParty">
                <a className="item flex align-center">
                  <SVG content={partyIcon(Color.Blue)} size={32} />
                  <span className="flex-1 h4 item-title bold color-darkgray pl-2x">
                    Host a drop party
                  </span>
                  <span className="more bold color-red transition">Pizza party included</span>
                  <SVG content={chevronRight()} size={18} className={'ml-1x'} />
                </a>
              </Link>
              <Link href="/contact?category=sponsor">
                <a className="item flex align-center">
                  <SVG content={monetizationIcon(Color.Green)} size={32} />
                  <span className="flex-1 h4 item-title bold color-darkgray pl-2x">
                    Sponsor a project
                  </span>
                  <span className="more bold color-red transition">
                    Transform a community today
                  </span>
                  <SVG content={chevronRight()} size={18} className={'ml-1x'} />
                </a>
              </Link>
              <Link href="/contact?category=fundraiser">
                <a className="item flex align-center">
                  <SVG content={moneyBagIcon(Color.Yellow)} size={32} />
                  <span className="flex-1 h4 item-title bold color-darkgray pl-2x">
                    Start a fundraiser
                  </span>
                  <span className="more bold color-red transition">Start your campaign</span>
                  <SVG content={chevronRight()} size={18} className={'ml-1x'} />
                </a>
              </Link>
              <a
                href={socialAmazon}
                target="_blank"
                rel="noopener noreferrer"
                className="item flex align-center"
              >
                <SVG content={amazonIcon()} size={32} />
                <span className="flex-1 h4 item-title bold color-darkgray pl-2x">
                  Give through Amazon smile
                </span>
                <span className="more bold color-red transition">Make others smile</span>
                <SVG content={chevronRight()} size={18} className={'ml-1x'} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
