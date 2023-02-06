import { useEffect, useRef } from 'react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
// import Image from 'next/image'
import SVG from '~/components/SVG'
import { chevronRight, chevronLeft } from '~/utils/svgImages'
import { useGlobalState } from '~/utils/state'
import { Carousel } from '~/sections/Carousel'
import MiteGlobe from './components/globe'
import { Steps } from '~/sections/Steps'
import { projectSlides as slides, reviewsList } from '~/utils/data'
// import bgImage from 'public/images/bg-main_banner.png'

import styles from './style.module.scss'

SwiperCore.use([Navigation, Pagination, Autoplay])

export const GuestHome = () => {
  const videoRef = useRef()
  const textRef = useRef()
  const [isGiveOpened, setGiveOpened] = useGlobalState('givePopup', false)
  useEffect(() => {
    import('wowjs').then(({ WOW }) => {
      new WOW().init()
    })
  }, [])
  setTimeout(() => {
    textRef.current?.classList.add('opacity-0')
    videoRef.current?.play()
    setTimeout(() => {
      textRef.current?.classList.remove('opacity-0')
    }, videoRef.current?.duration * 1000)
  }, 5000)
  return (
    <>
      <section className={`${styles.mainBanner} section-indent color-white h-100vh flex relative`}>
        <video muted id="myVideo" ref={videoRef}>
          <source src="/video/rain.mp4" type="video/mp4" />
        </video>
        {/*<Image src={bgImage.src} layout="fill" objectFit="cover" objectPosition="center" />*/}
        <div
          className="container text-center uppercase my-auto transition"
          ref={textRef}
          style={{ transitionDuration: '1s' }}
        >
          <h1 className="h1 bold mb-1rem">Charity in action</h1>
          <h4 className="h4 weight-800">a life changing experience</h4>
        </div>
      </section>
      <section className={`${styles.sliderWrapper} container section-indent`}>
        <div className="wow fadeInUp">
          <h2 className="h2 title weight-800 text-center relative color-darkgray mb-2x mb-4x_lg pseudo_before_circle_green pseudo_after_circle_green">
            <span className="block color-red">Choose a project</span>
            that matters to you
          </h2>
          <p className="description text-center mw-50rem mx-auto relative pseudo_before pseudo_after_circle_yellow">
            At Mite, we connect givers with worthy causes, helping fund the missions of trusted
            nonprofits doing incredible charity work across the globe. By directing donations to
            projects that matter, together we put hope in motion & charity in action - changing the
            world one person & one community at a time.
          </p>
        </div>
        <Carousel slides={slides} />
      </section>
      <section className={`${styles.trackingSection} section-indent pt-0`}>
        <div className="container">
          <div className="general-info flex justify-between pt-4x_lg pb-4x_lg">
            <div className="text wow fadeInUp my-auto mr-4x_xl">
              <h2 className="title h2 weight-800 color-darkgray relative mb-2x mb-4x_lg pseudo_before_circle_green pseudo_after">
                <span className="block color-red">Track your impact</span>around the world
              </h2>
              <p className="mb-3x mb-6x_lg">
                Our path to impact is total transparency. The stories, statistics & scenes from
                missions are reported straight to you. Our focus is ensuring transparent giving &
                transparent outcomes - because actions speak louder than words.
              </p>
              <Link href="/api/auth/login">
                <a className="btn darkgray mb-6x mb-1x_lg">Start tracking</a>
              </Link>
            </div>
            <div className="globe relative pseudo_before_circle_green pseudo_after_circle_yellow">
              <MiteGlobe />
            </div>
          </div>
          <div className="progress-counter flex text-center pt-6x pb-6x">
            <div className="item">
              <p className="h3 weight-800 color-darkgray">70k+</p>
              <p>People Impacted</p>
            </div>
            <div className="item">
              <p className="h3 weight-800 color-darkgray">17</p>
              <p>Partner Organizations</p>
            </div>
            <div className="item">
              <p className="h3 weight-800 color-darkgray">$400k</p>
              <p>Mites Given</p>
            </div>
            <div className="item">
              <p className="h3 weight-800 color-darkgray">20</p>
              <p>Countries</p>
            </div>
          </div>
          <div className="promo-info text-center relative wow fadeInUp pseudo_before_circle pseudo_after">
            <p className="h2 weight-800 relative index-1 mx-auto slogan color-darkgray mb-2x mb-4x_lg">
              All donations go directly to our projects
            </p>
            <p className="secondary-text relative pseudo_before pseudo_after mb-3x mb-6x_lg">
              That&apos;s what we call charity.
            </p>
            <button
              className="btn darkgray relative pseudo pseudo_before pseudo_after_circle"
              onClick={() => setGiveOpened(!isGiveOpened)}
            >
              Get involved
            </button>
          </div>
        </div>
      </section>
      <section className={`${styles.charityCommunity} section-indent`}>
        <div className="container">
          <div className="wow fadeInUp">
            <h2 className="title h2 weight-800 text-center relative color-darkgray max-content mx-auto pseudo_before_circle_green pseudo_after_circle_green mb-2x mb-4x_lg">
              <span className="block color-red">Join the charity</span>
              platform made for givers
            </h2>
            <p className="mx-auto text-center main-description relative pseudo_before pseudo_after_circle_yellow mw-50rem mb-4x mb-6x_lg">
              Are you ready to experience the joy of giving? Get real live, personalized updates
              about the help you provide to people worldwide. Enjoy a charity platform, made for the
              giver in you.
            </p>
          </div>
          <Steps />
          <div className="relative mt-16x_lg">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              speed={1500}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              pagination={{ clickable: true }}
            >
              {reviewsList.map(({ review, author, position }, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="reviews-block mx-auto mw-50rem pt-8x pt-11x_lg mb-6x mb-11x_lg">
                      <h3 className="h3 review weight-800 relative mb-0 color-darkgray pt-6x pb-4x pt-7x_lg pb-7x_lg pseudo_before pseudo_after">
                        {review}
                      </h3>
                      <h4 className="h4 name bold color-darkgray mb-1x">{author}</h4>
                      <p>{position}</p>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <div className="swiper-navigation flex items-center justify-between pseudo_after_circle_yellow">
              <div className="swiper-button swiper-prev pointer">
                <SVG content={chevronLeft()} size={16} />
              </div>
              <div className="swiper-button swiper-next pointer">
                <SVG content={chevronRight()} size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
