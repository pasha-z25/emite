import { useState, useRef, useEffect } from 'react'
import { debounce, stream } from '@fluss/core'
import Image from 'next/image'
import { chevronLeft, chevronRight } from '~/utils/svgImages'
import { log, isMobile } from '~/utils/helpers'
import SVG from '~/components/SVG'

import styles from './style.module.scss'

const touchMoveStream = stream()

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

let xDown = null
let yDown = null

function getTouches(evt) {
  return evt.touches
}
function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}
const onTouchMove = (activeIndex, setActive, slides) => (evt) => {
  if (!xDown || !yDown) {
    return
  }

  let xUp = evt.touches[0].clientX
  let yUp = evt.touches[0].clientY

  let xDiff = xDown - xUp
  let yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      log('right swipe')
      setActive(activeIndex === slides.length - 1 ? 0 : activeIndex + 1)
    } else {
      /* left swipe */
      log('left swipe')
      setActive(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      log('down swipe')
    } else {
      /* up swipe */
      log('up swipe')
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

export const Carousel = ({ slides }) => {
  const [activeIndex, setActive] = useState(0)
  const [sliderDelay, setSliderDelay] = useState(5000)
  const len = slides.length
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchmove', debounce(touchMoveStream.send, 10))
  }, [])

  useEffect(
    () => touchMoveStream.listen(onTouchMove(activeIndex, setActive, slides)),
    [activeIndex]
  )

  // Autoplay
  useInterval(() => {
    setActive((activeIndex + 1) % len)
  }, sliderDelay)

  //Return style according to index
  const getStyle = (idx) => {
    //Counting from the left, the distance between idx and currentKey
    const distance_left = idx - activeIndex
    //Counting from the right, the distance between idx and currentKey
    const distance_right = distance_left > 0 ? distance_left - len : distance_left + len
    //Select the distance with the smallest absolute value
    const distance =
      Math.abs(distance_left) > Math.abs(distance_right) ? distance_right : distance_left

    const styleObj = {}
    const styleImgWrap = {}

    if (distance === 0) {
      styleObj.left = isMobile() ? '10%' : '21%'
      styleObj.zIndex = 9
      styleObj.opacity = 1
      styleObj.position = 'relative'
    } else {
      styleObj.left =
        Math.abs(distance) > 2
          ? isMobile()
            ? `5%`
            : `50%`
          : isMobile()
          ? `${10 + distance * 5}%`
          : `${21 + distance * 10.5}%`
    }

    //The distance is not less than 2, hide
    if (Math.abs(distance) >= 1) {
      // styleImgWrap.filter = isMobile() ? '' : 'contrast(90%) brightness(90%) blur(2px)'
      styleImgWrap.boxShadow = isMobile() ? 'unset' : '0 2px 60px rgba(109, 66, 27, 0.06)'
      styleImgWrap.transform = 'scale(0.9)'
      styleObj.zIndex = 5
    }
    if (Math.abs(distance) >= 2) {
      styleImgWrap.transform = 'scale(0.8)'
      styleObj.zIndex = 1
    }
    if (Math.abs(distance) >= 3) {
      styleObj.opacity = 0
      styleObj.transform = 'scale(0.7)'
    }

    return { styleObj, styleImgWrap }
  }

  const navigationArrows = (() => (
    <div className="arrows flex align-center">
      <button
        className="navigation-button flex align-center justify-center"
        onClick={() => setActive(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)}
      >
        <SVG content={chevronLeft()} />
      </button>
      <button
        className="navigation-button flex align-center justify-center"
        onClick={() => setActive(activeIndex === slides.length - 1 ? 0 : activeIndex + 1)}
      >
        <SVG content={chevronRight()} />
      </button>
    </div>
  ))()
  return isMobile() ? (
    <div className={styles.slider}>
      <div className="carousel relative">
        <div className="card-container relative overflow-hidden">
          {slides.map(
            (
              {
                slideTitle,
                slideDescription,
                category,
                categoryIcon,
                location,
                locationIcon,
                peopleServed,
                imageUrl,
              },
              index
            ) => (
              <div
                className="carousel-card absolute index-1 pointer"
                key={index}
                onClick={() => setActive(index)}
                style={getStyle(index).styleObj}
              >
                <div
                  className="image color-white border-r20px bg-imgFull relative mb-4x"
                  style={getStyle(index).styleImgWrap}
                >
                  <Image
                    src={`${imageUrl}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="border-r20px"
                  />
                </div>
                <div
                  className="name-wrapper index-1 w-100 bg-almostWhite"
                  style={{ opacity: activeIndex === index ? '1' : '0' }}
                >
                  <h4 className="h4 bold color-darkgray mb-2x">{slideTitle}</h4>
                  <p className="small-text mb-3x">{slideDescription}</p>
                </div>
                <div
                  className="overflow-hidden description-wrapper flex mb-3x"
                  style={{
                    opacity: activeIndex === index ? '1' : '0',
                    // height: activeIndex === index ? 'auto' : '0',
                  }}
                >
                  <div className="flex-1">
                    <p className="flex align-center mb-3x">
                      <span
                        className="svgIcon"
                        dangerouslySetInnerHTML={{ __html: categoryIcon }}
                        style={{ lineHeight: '0.5' }}
                      />
                      <span className="pl-1x bold" style={{ lineHeight: '1.1' }}>
                        {category}
                      </span>
                    </p>
                    <p className="flex align-center">
                      <span
                        className="svgIcon"
                        dangerouslySetInnerHTML={{ __html: locationIcon }}
                        style={{ lineHeight: '0.5' }}
                      />
                      <span className="pl-1x bold" style={{ lineHeight: '1.1' }}>
                        {location}
                      </span>
                    </p>
                  </div>
                  <p
                    className="served text-center flex flex-column align-center justify-center"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span className="h3 weight-800 block color-darkgray">{peopleServed}</span>
                    <span>People served</span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        {navigationArrows}
      </div>
    </div>
  ) : (
    <div className={styles.slider}>
      <div className="carousel relative">
        <div className="card-container relative overflow-hidden">
          {slides.map(
            (
              {
                slideTitle,
                slideDescription,
                category,
                categoryIcon,
                location,
                locationIcon,
                peopleServed,
                imageUrl,
              },
              index
            ) => (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                className="carousel-card absolute index-1 pointer mt-4x"
                key={index}
                onClick={() => setActive(index)}
                style={getStyle(index).styleObj}
                onMouseEnter={() => setSliderDelay(3600000)}
                onMouseLeave={() => setSliderDelay(5000)}
              >
                <div
                  className="image color-white border-r20px bg-imgFull relative mb-2rem"
                  style={getStyle(index).styleImgWrap}
                >
                  <Image
                    src={`${imageUrl}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="border-r20px"
                  />
                  <div
                    className="container wide name-wrapper index-1 flex justify-between absolute w-100"
                    style={{ opacity: activeIndex === index ? '1' : '0' }}
                  >
                    <h4 className="h4 bold title">{slideTitle}</h4>
                    <p className="flex icons">
                      <span className="relative hovered category">
                        <span className="popup">{category}</span>
                        <span
                          dangerouslySetInnerHTML={{ __html: categoryIcon }}
                          style={{ lineHeight: '1' }}
                        />
                      </span>
                      <span className="relative hovered location">
                        <span className="popup">{location}</span>
                        <span
                          dangerouslySetInnerHTML={{ __html: locationIcon }}
                          style={{ lineHeight: '1' }}
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="container wide relative overflow-hidden description-wrapper flex"
                  style={{
                    opacity: activeIndex === index ? '1' : '0',
                    height: activeIndex === index ? 'auto' : '0',
                    // top: activeIndex === index ? '0' : '-15rem',
                  }}
                >
                  <p className="small-text">{slideDescription}</p>
                  <p
                    className="served text-center flex flex-column align-center justify-center"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span className="h3 weight-800 block color-darkgray">{peopleServed}</span>
                    <span>People served</span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        {navigationArrows}
      </div>
    </div>
  )
}
