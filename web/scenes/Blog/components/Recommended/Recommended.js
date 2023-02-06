import { useEffect, useState } from 'react'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card } from './components/Card'
import { useGlobalState } from '~/utils/state'

SwiperCore.use([Navigation, Pagination])

export const Recommended = () => {
  const [blog, setBlog] = useState([])
  const QUERY = groq`
    *[_type == "blog"] [0..9] {
      _id,
      title,
      description,
      publishedAt,
      reading,
      slug {
        current
      },
      mainImage {
        asset {
          _ref
        },
        alt,
        caption
      },
      views,
      likes
    }
  `
  useEffect(async () => {
    setBlog(await getClient().fetch(QUERY))
  }, [])
  const [user] = useGlobalState('user')

  return (
    <>
      <h2 className="h2 color-darkgray text-center weight-800 mb-4x mb-7x_lg">
        <span className="color-red">Recommended</span> articles
      </h2>
      <Swiper
        breakpoints={{
          320: {
            // width: 320,
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            // width: 768,
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 768px
          1200: {
            // width: 768,
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        pagination={{ clickable: true }}
      >
        {blog?.map((post) => {
          return (
            <SwiperSlide key={post._id} className={'recommendPostCard'}>
              <Card post={post} users={[user?.sanityUser, user?.auth0User]} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
