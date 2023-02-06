import { useRef, useState } from 'react'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import SVG from '~/components/SVG'
import { chevronLeft, chevronRight, closeIcon } from '~/utils/svgImages'
import { useGlobalState } from '~/utils/state'
import { Color } from '~/utils/constants'
import { mediaItem } from '~/scenes/Media/components/helpers'
import { SwiperSlideItem } from '~/scenes/Media/components/SwiperSlide'

import styles from '~/scenes/Media/style.module.scss'

SwiperCore.use([Navigation])

export const ProjectGallery = ({ media: currentImages, view = 'list' }) => {
  const swiperRef = useRef()
  const [swiperPopup, setSwiperPopup] = useState(false)
  const [shareGroupOpen, setShareGroupOpen] = useState(false)
  const [user] = useGlobalState('user')
  const setActiveSlide = (index) => {
    setSwiperPopup(true)
    swiperRef.current.slideTo(index, 500)
  }
  const disableSwiperPopup = () => {
    const videoFrame =
      swiperRef.current.slides[swiperRef.current.activeIndex]?.querySelector('video')
    const youtubeFrame =
      swiperRef.current.slides[swiperRef.current.activeIndex]?.querySelector('iframe')
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
  return currentImages?.length >= 1 ? (
    <>
      <div
        className={`${styles.imagesWrapper}`}
        style={{ gridTemplateColumns: view === 'list' ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)' }}
      >
        {currentImages.map((media, index) => {
          return (
            <div
              key={`${media._key}_${media._id}`}
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
            slidesPerView={1}
            spaceBetween={0}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              const videoFrame = swiper.slides[swiper.previousIndex]?.querySelector('video')
              const youtubeFrame = swiper.slides[swiper.previousIndex]?.querySelector('iframe')
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
                  <SwiperSlide key={`${media._key}_${media._id}`}>
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
  ) : (
    <h4 className="weight-800 color-darkgray text-center">The project does not have media files</h4>
  )
}
