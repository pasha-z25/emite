import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { array, consequent, sequentially } from '@fluss/core'
import Image from 'next/image'
import useResize from 'use-resizing'

import styles from './style.module.scss'

const updateSlide = (() => {
  let previousImage = null
  let previousSlide = null

  /**
   * @param {HTMLDivElement}  image
   * @param {HTMLElement} slide
   */
  return (image, slide) => {
    image.classList.add('show')
    previousImage?.classList.remove('show')
    slide.classList.add('colored', 'inProgress')
    previousSlide?.classList.remove('inProgress')

    previousSlide = slide
    previousImage = image
  }
})()

export const Steps = () => {
  useEffect(() => {
    if ('window' in globalThis) {
      window.addEventListener('scroll', scrollHandler)
    }
  }, [])
  const hiddenRef = useRef()
  const screenSize = useResize()
  let imagesItems = []
  let stepsItems = []
  let scrolledWrapper

  const startStepsCarousel = consequent(async (start) => {
    if ('window' in globalThis) {
      imagesItems.length === 0 && (imagesItems = array(document.querySelectorAll('.image-item')))
      stepsItems.length === 0 && (stepsItems = array(document.querySelectorAll('.step-item')))
      screenSize.width <= 1200 &&
        !scrolledWrapper &&
        (scrolledWrapper = document.querySelector('.horizontal-container'))

      const stepHandlers = stepsItems.map(
        (item, index) => () =>
          new Promise((resolve) =>
            setTimeout(
              () => {
                updateSlide(imagesItems[index], item)
                scrolledWrapper &&
                  scrolledWrapper.scrollBy({
                    left: window.innerWidth * 0.7 * index,
                    behavior: 'smooth',
                  })
                resolve()
              },
              index - start ? 7000 : 0
            )
          )
      )

      if (
        0 < hiddenRef.current?.getBoundingClientRect().top &&
        hiddenRef.current?.getBoundingClientRect().top < window.innerHeight
      ) {
        window.removeEventListener('scroll', scrollHandler)

        imagesItems[imagesItems.length - 1].classList.remove('show')
        stepsItems.forEach((item) => item.classList.remove('colored', 'finish'))

        if (start > 0) {
          stepHandlers
            .filter((_, index) => index < start)
            .forEach((_, index) => updateSlide(imagesItems[index], stepsItems[index]))
        }

        await sequentially(...stepHandlers.filter((_, index) => index >= start))().then(() => {
          setTimeout(() => {
            stepsItems[stepsItems.length - 1].classList.remove('inProgress')
            stepsItems[stepsItems.length - 1].classList.add('finish')
          }, 3000)
        })
      }
    }
  })

  const scrollHandler = () => startStepsCarousel(0)

  return (
    <>
      <div
        className={`${styles.charitySteps} flex align-center justify-between charity-steps`}
        ref={hiddenRef}
      >
        <div className="images-wrapper relative">
          <div className="image-item absolute transition border-r20px box-shadow">
            <Image
              src={`/images/List.png`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="border-r20px"
            />
          </div>
          <div className="image-item absolute transition border-r20px box-shadow">
            <Image
              src={`/images/Screen.png`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="border-r20px"
            />
          </div>
          <div className="image-item absolute transition border-r20px box-shadow">
            <Image
              src={`/images/Screenshot_3.png`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="border-r20px"
            />
          </div>
        </div>
        {screenSize.width <= 1200 ? (
          <div className="horizontal-container">
            <div className="wrap">
              <ul className="steps-list">
                <li className="step-item relative transition">
                  <span className="line absolute">
                    <span className="circle" />
                  </span>
                  <div className="content_block">
                    <p
                      className="name color-darkgray"
                      onClick={() => {
                        startStepsCarousel(0)
                      }}
                    >
                      Personalized Insights
                    </p>
                    <p className="description transition">
                      Receive customized updates & exclusive insider access to the projects you help
                      fund
                    </p>
                  </div>
                </li>
                <li className="step-item relative transition">
                  <span className="line absolute">
                    <span className="circle" />
                  </span>
                  <div className="content_block">
                    <p className="name color-darkgray" onClick={() => startStepsCarousel(1)}>
                      Charity Community
                    </p>
                    <p className="description transition">
                      Join hundreds of others in the Mite community who are spreading the joy of
                      giving!
                    </p>
                  </div>
                </li>
                <li className="step-item relative transition">
                  <span className="line absolute">
                    <span className="circle" />
                  </span>
                  <div className="content_block">
                    <p className="name color-darkgray">Proof of Impact</p>
                    <p className="description transition">
                      Know how your gift is used - 100% of the time. Receive stories, videos,
                      reports, and statistics throughout the lifecycle of every project.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="steps-list">
            <li className="step-item relative transition">
              <span className="line absolute">
                <span className="circle" />
              </span>
              <div className="content_block">
                <p className="name color-darkgray" onClick={() => startStepsCarousel(0)}>
                  Personalized Insights
                </p>
                <p className="description transition">
                  Receive customized updates & exclusive insider access to the projects you help
                  fund
                </p>
              </div>
            </li>
            <li className="step-item relative transition">
              <span className="line absolute">
                <span className="circle" />
              </span>
              <div className="content_block">
                <p className="name color-darkgray" onClick={() => startStepsCarousel(1)}>
                  Charity Community
                </p>
                <p className="description transition">
                  Join hundreds of others in the Mite community who are spreading the joy of giving!
                </p>
              </div>
            </li>
            <li className="step-item relative transition">
              <span className="line absolute">
                <span className="circle" />
              </span>
              <div className="content_block">
                <p className="name color-darkgray">Proof of Impact</p>
                <p className="description transition">
                  Know how your gift is used - 100% of the time. Receive stories, videos, reports,
                  and statistics throughout the lifecycle of every project.
                </p>
              </div>
            </li>
            <Link href="/join-us">
              <a className="btn red mt-4x">Join us</a>
            </Link>
          </ul>
        )}
        <Link href="/join-us">
          <a className="btn red">Get started</a>
        </Link>
      </div>
    </>
  )
}
