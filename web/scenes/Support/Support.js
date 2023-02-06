import { useEffect } from 'react'
import Link from 'next/link'
import useResize from 'use-resizing'
import SVG from '~/components/SVG'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGlobalState } from '~/utils/state'
import { Search } from './components/Search/Search'
import { FAQlist } from './components/FAQ'
import { Color, organizationEmail, organizationLocation } from '~/utils/constants'
import { HelpfulResources } from '~/sections/HelpfulResources'
import { chevronRight, locationIcon, mailIcon, messageIcon, phoneIcon } from '~/utils/svgImages'

import styles from './style.module.scss'

SwiperCore.use([Pagination])

export const SupportPage = () => {
  const [isContactOpened, setContactOpened] = useGlobalState('contactPopup', false)
  useEffect(() => {
    import('wowjs').then(({ WOW }) => {
      new WOW().init()
    })
  }, [])

  const screenSize = useResize()
  return (
    <>
      <section className={`${styles.wrapper} pt-16x pt-20x_lg`}>
        <div className="container">
          <h1 className="h1 main-title relative text-center weight-800 color-darkgray pseudo_before_circle_yellow pseudo_after_circle_yellow mb-4x mb-9x_lg">
            What can we{' '}
            <span className="color-red block pseudo_before_circle_green pseudo_after_circle_red">
              help you with?
            </span>
          </h1>
          <Search handler={() => null} />
        </div>
        <div className="relative section-indent pb-0">
          {screenSize.width >= 2100 ? (
            <div className="flex justify-center">
              <div className="card contact-card box-shadow flex flex-column">
                <SVG content={mailIcon(Color.Red)} size={40} className={'mb-3x mb-4x_lg'} />
                <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Email</h4>
                <p className="description flex-1 mb-2x mb-3x_lg">
                  For detailed inquiries, <br />
                  please email us.
                </p>
                <a className="link arrow-link red" href={`mailto:${organizationEmail}`}>
                  Send us an email
                  <SVG content={chevronRight(Color.Red)} size={18} />
                </a>
              </div>
              <div className="card contact-card box-shadow flex flex-column">
                <SVG content={messageIcon(Color.Yellow)} size={40} className={'mb-3x mb-4x_lg'} />
                <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Text</h4>
                <p className="description flex-1 mb-2x mb-3x_lg">
                  Want to simply chat <br />
                  over text?
                </p>
                <a
                  className="link arrow-link red pointer"
                  onClick={() => setContactOpened(!isContactOpened)}
                >
                  Chat with us
                  <SVG content={chevronRight(Color.Red)} size={18} />
                </a>
              </div>
              <div className="card contact-card box-shadow flex flex-column">
                <SVG content={phoneIcon(Color.Blue)} size={40} className={'mb-3x mb-4x_lg'} />
                <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Phone</h4>
                <p className="description flex-1 mb-2x mb-3x_lg">
                  Give us a call or leave a <br />
                  detailed message.
                </p>
                <a
                  className="link arrow-link red pointer"
                  onClick={() => setContactOpened(!isContactOpened)}
                >
                  Call us
                  <SVG content={chevronRight(Color.Red)} size={18} />
                </a>
              </div>
              <div className="card contact-card box-shadow flex flex-column">
                <SVG content={locationIcon(Color.Green)} size={40} className={'mb-3x mb-4x_lg'} />
                <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Location</h4>
                <p className="description flex-1 mb-2x mb-3x_lg">
                  710 Catawba St, Ste. A, <br /> Belmont, NC 28012
                </p>
                <a
                  className="link arrow-link red"
                  href={organizationLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send us mail
                  <SVG content={chevronRight(Color.Red)} size={18} />
                </a>
              </div>
            </div>
          ) : (
            <Swiper
              breakpoints={{
                320: {
                  // width: 320,
                  slidesPerView: 'auto',
                  spaceBetween: 20,
                },
                // when window width is >= 640px
                992: {
                  // width: 640,
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                // when window width is >= 768px
                1200: {
                  // width: 768,
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <div className="card contact-card box-shadow flex flex-column">
                  <SVG content={mailIcon(Color.Red)} size={40} className={'mb-3x mb-4x_lg'} />
                  <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Email</h4>
                  <p className="description flex-1 mb-2x mb-3x_lg">
                    For detailed inquiries, {/* screenSize.width >= 1650 && <br /> */}
                    please email us.
                  </p>
                  <a className="link arrow-link red" href={`mailto:${organizationEmail}`}>
                    Send us an email
                    <SVG content={chevronRight(Color.Red)} size={18} />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card contact-card box-shadow flex flex-column">
                  <SVG content={messageIcon(Color.Yellow)} size={40} className={'mb-3x mb-4x_lg'} />
                  <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Text</h4>
                  <p className="description flex-1 mb-2x mb-3x_lg">
                    Want to simply chat {/* screenSize.width >= 1650 && <br /> */}
                    over text?
                  </p>
                  <a
                    className="link arrow-link red pointer"
                    onClick={() => setContactOpened(!isContactOpened)}
                  >
                    Chat with us
                    <SVG content={chevronRight(Color.Red)} size={18} />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card contact-card box-shadow flex flex-column">
                  <SVG content={phoneIcon(Color.Blue)} size={40} className={'mb-3x mb-4x_lg'} />
                  <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Phone</h4>
                  <p className="description flex-1 mb-2x mb-3x_lg">
                    Give us a call or leave a {/* screenSize.width >= 1650 && <br /> */}
                    detailed message.
                  </p>
                  <a
                    className="link arrow-link red pointer"
                    onClick={() => setContactOpened(!isContactOpened)}
                  >
                    Call us
                    <SVG content={chevronRight(Color.Red)} size={18} />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card contact-card box-shadow flex flex-column">
                  <SVG content={locationIcon(Color.Green)} size={40} className={'mb-3x mb-4x_lg'} />
                  <h4 className="h4 bold title color-darkgray mb-1x mb-2x_lg">Location</h4>
                  <p className="description flex-1 mb-2x mb-3x_lg">
                    710 Catawba St, Ste. A, {/* screenSize.width >= 1650 && <br /> */} Belmont, NC
                    28012
                  </p>
                  <a
                    className="link arrow-link red"
                    href={organizationLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send us mail
                    <SVG content={chevronRight(Color.Red)} size={18} />
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </section>
      <section className="section-indent container">
        <div className="row">
          <div className="col col-2__lg mb-6x mb-1x_lg">
            <div
              className={`${styles.textWrapper} wrapper relative wow fadeInUp pseudo_before_circle_blue pseudo_after_circle_yellow pr-4x_lg`}
            >
              <h2
                className={`${styles.secondaryTitle} h2 weight-800 relative color-darkgray pseudo_after mb-2x mb-4x_lg`}
              >
                We&apos;ve got you covered, <span className="color-red">24/7</span>
              </h2>
              <p className="mb-3x mb-6x_lg">
                Got a question? We are here to help! All things related to Mite can be found in our
                Resource Center.
              </p>
              <Link href="/resources">
                <a className="btn red">Visit Resources</a>
              </Link>
            </div>
          </div>
          <div className="col col-2__lg">
            <FAQlist />
          </div>
        </div>
      </section>
      <section className="section-indent pt-0">
        <div className="container">
          <HelpfulResources />
        </div>
      </section>
    </>
  )
}
