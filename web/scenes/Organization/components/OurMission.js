import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import useResize from 'use-resizing'
import { throttle } from '@fluss/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import { whenBrowser } from '~/utils/helpers'

let currentSwiper
export const OurMission = () => {
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
        currentSwiper.slidePrev(500)
      } else if (e.wheelDeltaY < 0) {
        currentSwiper.slideNext(500)
      }
    }
  }, 30)

  const scrollHandler = (e) => {
    whenBrowser(() => {
      if (
        route === '/organization' &&
        window.scrollY > swiperRef?.current?.offsetHeight &&
        window.scrollY < swiperRef?.current?.offsetHeight + 50
      ) {
        intervalFunction(e)
      }
    })
  }
  return (
    <>
      <div ref={swiperRef} className="container section-indent">
        <Swiper
          slidesPerView={1}
          direction={'vertical'}
          onSwiper={(swiper) => (currentSwiper = swiper)}
        >
          <SwiperSlide>
            <div className="item my-auto relative index-1">
              <h2 className="title uppercase relative color-white max-content mb-2x mb-4x_lg">
                Our <br />
                mission
              </h2>
              <p style={{ maxWidth: '31rem' }}>
                Creating a community of changemakers inspired and united in the joy of giving &
                impactful global charity.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item my-auto relative index-1">
              <h2 className="title uppercase relative color-white max-content mb-2x mb-4x_lg">
                Our <br />
                vision
              </h2>
              <p style={{ maxWidth: '31rem' }}>
                In every nation, every person will know the joy of giving
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}
