import { useEffect, useState, useRef } from 'react'
import { debounce } from '@fluss/core'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Color } from '~/utils/constants'
import { useGlobalState } from '~/utils/state'
import SVG from '~/components/SVG'
import { chevronLeft, chevronRight, closeIcon } from '~/utils/svgImages'
import { useImages, useCountOfAllImages, mediaItem } from './components/helpers'
import { SwiperSlideItem } from './components/SwiperSlide'

import styles from './style.module.scss'

SwiperCore.use([Navigation])

const intervalFunction = debounce((predicate, reFetchPosts) => {
  if (window.pageYOffset > document.body.clientHeight - window.innerHeight * 2) {
    if (predicate()) {
      reFetchPosts()
    }
  }
}, 20)

export const MediaPage = () => {
  const [user] = useGlobalState('user')
  const [swiperPopup, setSwiperPopup] = useState(false)
  const [shareGroupOpen, setShareGroupOpen] = useState(false)
  const swiperRef = useRef()
  const allImagesCount = useCountOfAllImages()
  const [currentImages, loadImages] = useImages()
  useEffect(() => {
    const scrollHandler = () =>
      intervalFunction(() => allImagesCount > currentImages.length, loadImages)

    if ('window' in globalThis) {
      window.addEventListener('scroll', scrollHandler)
    }
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [allImagesCount, currentImages])
  useEffect(() => {
    swiperRef.current.update()
  }, [currentImages])
  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = swiperPopup ? 'hidden' : 'initial'
    }
  }, [swiperPopup])
  const setActiveSlide = (index) => {
    setSwiperPopup(true)
    swiperRef.current.slideTo(index, 500)
  }
  const disableSwiperPopup = () => {
    const videoFrame =
      swiperRef.current.slides[swiperRef.current.activeIndex].querySelector('video')
    const youtubeFrame =
      swiperRef.current.slides[swiperRef.current.activeIndex].querySelector('iframe')
    if (videoFrame) {
      videoFrame.pause()
      videoFrame.currentTime = 0
    }
    if (youtubeFrame) {
      youtubeFrame.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      )
    }
    setSwiperPopup(false)
  }
  return (
    <>
      <div className={`${styles.imagesWrapper} container pt-10x pb-10x`}>
        {currentImages.map((media, index) => {
          return (
            <div
              key={media._key}
              className="block-radius flex pointer relative bg-black overflow-hidden"
              onClick={() => setActiveSlide(index)}
            >
              {mediaItem(media)}
            </div>
          )
        })}
      </div>
      <div
        className={`${styles.sliderWrapper} transition flex align-center justify-center`}
        style={{
          opacity: swiperPopup ? '1' : '0',
          zIndex: swiperPopup ? '10' : '-5',
        }}
      >
        <span
          className="close absolute pointer transition"
          dangerouslySetInnerHTML={{ __html: closeIcon(Color.White) }}
          onClick={disableSwiperPopup}
        />
        <div className="slider-card relative">
          <Swiper
            // autoHeight={true}
            slidesPerView={1}
            spaceBetween={0}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              const videoFrame = swiper.slides[swiper.previousIndex].querySelector('video')
              const youtubeFrame = swiper.slides[swiper.previousIndex].querySelector('iframe')
              if (videoFrame) {
                videoFrame.pause()
                videoFrame.currentTime = 0
              }
              if (youtubeFrame) {
                youtubeFrame.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  '*'
                )
              }
            }}
          >
            {currentImages.length > 0 &&
              currentImages.map((media) => {
                return (
                  <SwiperSlide key={media._key}>
                    <SwiperSlideItem
                      media={media}
                      state={[shareGroupOpen, setShareGroupOpen]}
                      users={[user?.sanityUser, user?.auth0User]}
                    />
                  </SwiperSlide>
                )
              })}
          </Swiper>
          <div
            className="swiper-navigation items-center justify-between"
            style={{ display: shareGroupOpen ? 'none' : 'flex' }}
            hidden={shareGroupOpen}
          >
            <div className="swiper-button swiper-prev pointer">
              <SVG content={chevronLeft(Color.White)} size={16} />
            </div>
            <div className="swiper-button swiper-next pointer">
              <SVG content={chevronRight(Color.White)} size={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MediaPage
