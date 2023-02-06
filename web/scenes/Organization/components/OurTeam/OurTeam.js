import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useResize from 'use-resizing'
import { useRouter } from 'next/router'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { whenBrowser, isMobile } from '~/utils/helpers'
import { throttle } from '@fluss/core'

import ourTeam from './ourTeam.json'

SwiperCore.use([Pagination])

let currentSwiper
export const OurTeam = () => {
  const { route } = useRouter()
  const swiperRef = useRef()
  const screenSize = useResize()
  useEffect(() => {
    if ('window' in globalThis) {
      window.addEventListener('wheel', scrollHandler, { passive: false })
    }
    return () => {
      window.removeEventListener('wheel', scrollHandler)
      whenBrowser(() => (document.body.style.overflowY = 'initial'))
    }
  }, [screenSize])

  const intervalFunction = throttle((e) => {
    if (screenSize.width > 992 && swiperRef.current && currentSwiper) {
      if (e.wheelDeltaY > 0) {
        if (currentSwiper.slidePrev()) {
          document.body.style.overflowY = 'hidden'
          currentSwiper.slidePrev(1000)
        } else {
          document.body.style.overflowY = 'initial'
        }
      } else if (e.wheelDeltaY < 0) {
        if (currentSwiper.slideNext()) {
          document.body.style.overflowY = 'hidden'
          currentSwiper.slideNext(1000)
        } else {
          document.body.style.overflowY = 'initial'
        }
      }
    } else {
      console.log('current Swiper is undefined!')
      document.body.style.overflowY = 'initial'
    }
  }, 30)

  const scrollHandler = (e) => {
    whenBrowser(() => {
      if (
        route === '/organization' &&
        window.scrollY > swiperRef?.current?.offsetTop &&
        window.scrollY < swiperRef?.current?.offsetTop + 50
      ) {
        intervalFunction(e)
      } else {
        document.body.removeAttribute('style')
      }
    })
  }

  return (
    <>
      {isMobile() ? (
        <>
          <div className="container text-center">
            <h2 className="h2 color-darkgray mb-2x mb-4x_lg">
              Our <span className="color-red">team</span>
            </h2>
            <p className="mb-5x">
              We connect givers with worthy causes, helping fund the missions of trusted nonprofits
              doing incredible charity work across the globe.
            </p>
          </div>
          <div ref={swiperRef} className="team-wrapper w-100 flex">
            <Swiper
              slidesPerView={'auto'}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (currentSwiper = swiper)}
            >
              {ourTeam.map((team, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="item notAbsolute">
                      <Image src={`/${team.image}`} alt={team.name} layout="fill" />
                      {/*<img src={team.image} alt={team.name} />*/}
                      <h4 className="h4 employee-name color-darkgray">{team.name}</h4>
                      <p>{team.position}</p>
                    </div>
                  </SwiperSlide>
                )
              })}
              <SwiperSlide>
                <div className="item my-auto">
                  <h2 className="h2 color-darkgray mb-2x mb-4x_lg">
                    Join <span className="color-red">us</span>
                  </h2>
                  <p className="mb-3rem">
                    We connect givers with worthy causes, helping fund the missions of trusted
                    nonprofits doing incredible charity work across the globe.
                  </p>
                  <Link href="/join-us">
                    <a className="btn red">Join us</a>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      ) : (
        <div ref={swiperRef} className="team-wrapper w-100 flex">
          <Swiper
            slidesPerView={'auto'}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (currentSwiper = swiper)}
          >
            <SwiperSlide>
              <div className="item my-auto">
                <h2 className="h2 mb-2rem color-darkgray">
                  Our <span className="color-red">team</span>
                </h2>
                <p>
                  We connect givers with worthy causes, helping fund the missions of trusted
                  nonprofits doing incredible charity work across the globe.
                </p>
              </div>
            </SwiperSlide>
            {ourTeam.map((team, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="item notAbsolute">
                    <Image src={`/${team.image}`} alt={team.name} layout="fill" />
                    {/*<img src={team.image} alt={team.name} />*/}
                    <h4 className="h4 employee-name color-darkgray">{team.name}</h4>
                    <p>{team.position}</p>
                  </div>
                </SwiperSlide>
              )
            })}
            <SwiperSlide>
              <div className="item my-auto">
                <h2 className="h2 mb-2rem color-darkgray">
                  Join <span className="color-red">us</span>
                </h2>
                <p className="mb-3rem">
                  We connect givers with worthy causes, helping fund the missions of trusted
                  nonprofits doing incredible charity work across the globe.
                </p>
                <Link href="/join-us">
                  <a className="btn red">Join us</a>
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  )
}
