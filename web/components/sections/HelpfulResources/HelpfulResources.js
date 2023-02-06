import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getImageUrl } from '~/utils/helpers'
import SVG from '~/components/SVG'
import { chevronRight } from '~/utils/svgImages'

import styles from './style.module.scss'
import Image from 'next/image'

SwiperCore.use([Navigation, Pagination])

export const HelpfulResources = () => {
  const swiperRef = useRef()
  const [articles, setArticles] = useState([])
  const QUERY = groq`
    *[_type == "article"] [0..9] {
      _id,
      _updatedAt,
      title,
      description,
      slug {
        current,
      },
      mainImage {
        asset {
          _ref,
          _type,
        },
        caption,
        alt,
      },
    }
  `
  useEffect(() => {
    getClient()
      .fetch(QUERY)
      .then((articles) => setArticles(articles))
  }, [])
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update()
    }
  }, [swiperRef, articles])

  return (
    <>
      <h2
        className={`${styles.title} h2 title weight-800 relative text-center color-darkgray pseudo_before_circle_yellow pseudo_after_circle_blue mb-4x mb-7x_lg`}
      >
        <span className="color-red pseudo_before_circle_red pseudo_after_circle_yellow">
          Helpful
        </span>{' '}
        resources
      </h2>
      <div className={`${styles.swiperWrapper} swiper-wrapper`}>
        <Swiper
          breakpoints={{
            320: {
              // width: 320,
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              // width: 768,
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              // width: 1200,
              slidesPerView: 3,
              spaceBetween: 40,
            },
            2100: {
              // width: 2100,
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {articles.length > 1 &&
            articles.map((article, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="resource-item mx-auto color-white relative overflow-hidden">
                    <div className="notAbsolute">
                      <Image
                        src={`${getImageUrl(article.mainImage?.asset?._ref)
                          .width(700)
                          .height(550)}`}
                        alt={article.title}
                        layout="fill"
                      />
                    </div>
                    {/*<img*/}
                    {/*  src={getImageUrl(article.mainImage.asset._ref).width(700).height(550)}*/}
                    {/*  alt={article.title}*/}
                    {/*  className="block"*/}
                    {/*/>*/}
                    <div className="info-wrapper absolute transition index-1">
                      <h4 className="h4 mb-1rem">{article.title}</h4>
                      <p
                        className="mb-1_5rem overflow-hidden opacity-80"
                        style={{ maxHeight: '3.5rem' }}
                      >
                        {article.description}
                      </p>
                      <Link href={`/resources/${article.slug.current}`}>
                        <a className="link arrow-link flex align-center bold">
                          Learn more
                          <SVG content={chevronRight('#FFFFFF')} size={16} />
                        </a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>
    </>
  )
}
