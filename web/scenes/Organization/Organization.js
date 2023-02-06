import { useState, useEffect } from 'react'
import useResize from 'use-resizing'
import Image from 'next/image'
import { Logos } from '~/sections/partnersLogo'
import { HelpfulResources } from '~/sections/HelpfulResources'
import { FAQlist } from './components/FAQ'
import { OurTeam } from './components/OurTeam'
import { OurMission } from './components/OurMission'
import SVG from '~/components/SVG'
import { chevronUp, chevronDown } from '~/utils/svgImages'
import { Color } from '~/utils/constants'
import bgImage from 'public/images/bg-main_banner.png'

import styles from './style.module.scss'

export const OrganizationPage = () => {
  const [showAllLogos, setShowAllLogos] = useState(false)
  useEffect(() => {
    import('wowjs').then(({ WOW }) => {
      new WOW().init()
    })
  }, [])
  const screenSize = useResize()
  return (
    <>
      <section className="section-indent flex relative h-100vh color-white">
        <Image src={bgImage.src} layout="fill" objectFit="cover" objectPosition="center" />
        <div className="container text-center uppercase my-auto">
          <h1 className="h1 bold mb-1rem">How it all began</h1>
          <h4 className="h4 bold mx-auto" style={{ maxWidth: '40rem' }}>
            A simple moment that sparked the grace of giving
          </h4>
        </div>
      </section>
      <section className={`${styles.ourMission} relative flex h-100vh`}>
        <OurMission />
      </section>
      <section className={`${styles.howWeOperate} section-indent`}>
        <div className="container">
          <div className="content-wrapper mx-auto mw-50rem">
            <div className="wow fadeInUp">
              <h2 className="h2 weight-800 main-title text-center relative color-darkgray mb-2x mb-4x_lg">
                How we <span className="color-red">operate</span>
              </h2>
              <p
                className="text-center main-description relative mb-3_5rem"
                style={{ fontSize: '1.125rem' }}
              >
                From start to finish, our transparent operations are designed so that your donations
                have the maximum impact. From finding worthy causes to overseeing accountability &
                project progress, we pledge to ensure the most effective outcomes for all involved.
              </p>
            </div>
            <FAQlist />
          </div>
        </div>
      </section>
      <section className={`${styles.ourTeam}`}>
        <OurTeam />
      </section>
      <section className={`${styles.ourPartners} section-indent`}>
        <div className="container text-center">
          <div className="wow fadeInUp">
            <h2 className="h2 mb-2rem title relative color-darkgray">
              Our global <span className="color-red">partners</span>
            </h2>
            <p className="mx-auto description relative mw-50rem mb-4_5rem">
              Meet the amazing organizations innovating & impacting humanity in so many inspiring
              ways. We are proud to partner with these powerful changemakers.
            </p>
          </div>
          {screenSize.width >= 992 ? (
            <>
              <div className="flex flex-wrap justify-between logos">
                <Logos />
              </div>
            </>
          ) : (
            <>
              <div
                className="flex relative flex-wrap justify-between logos logos-mobile overflow-hidden transition pseudo_after"
                style={{ maxHeight: showAllLogos ? '200vh' : '28rem' }}
              >
                <Logos />
                <div className="button-wrapper absolute text-center w-100 flex-1 index-1">
                  <a
                    className="color-red pointer flex align-center justify-center"
                    onClick={() => setShowAllLogos(!showAllLogos)}
                  >
                    {showAllLogos ? 'Hide  partners' : 'Show all partners'}{' '}
                    {showAllLogos ? (
                      <SVG content={chevronUp(Color.Red)} size={16} className="ml-1x" />
                    ) : (
                      <SVG content={chevronDown(Color.Red)} size={16} className="ml-1x" />
                    )}
                  </a>
                </div>
              </div>
            </>
          )}
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
