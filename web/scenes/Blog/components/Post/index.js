import { useEffect, useState } from 'react'
import Image from 'next/image'
import useResize from 'use-resizing'
import BlockContent from '@sanity/block-content-to-react'
import {
  getImageUrl,
  getFullDate,
  handleMutations,
  serializeMainImage,
  randomNumberInInterval,
} from '~/utils/helpers'
import SVG from '~/components/SVG'
import { likeIcon } from '~/utils/svgImages'
import { postLikesHandler } from '~/scenes/Blog'
import { Recommended } from '~/scenes/Blog/components/Recommended'
import { ShareGroup } from '~/scenes/Blog/components/ShareGroup'
import { reviewsList } from '~/utils/data'
import styles from '~/scenes/Blog/style.module.scss'
import { useGlobalState } from '~/utils/state'

const serializers = {
  types: {
    mainImage: serializeMainImage,
  },
}

const { review, author, position } = reviewsList[randomNumberInInterval(0, reviewsList.length)]

const postViewsHandler = (post) => {
  const mutations = [
    {
      patch: {
        id: post._id,
        setIfMissing: {
          views: 0,
        },
        inc: {
          views: 1,
        },
      },
    },
  ]
  handleMutations(mutations)
}

export const PostPage = ({ post }) => {
  useEffect(() => postViewsHandler(post), [])
  const screenSize = useResize()
  const [user] = useGlobalState('user')
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (user?.sanityUser) {
      setIsLiked(user?.sanityUser.posts?.some(({ postKey }) => postKey === post._id) || false)
    }
  }, [user?.sanityUser])

  return (
    <>
      <div className={`${styles.wrapper} ${user?.auth0User ? 'pt-4x' : 'pt-16x'}`}>
        <div className="container article-wrapper">
          <h2 className="h2 weight-800 color-darkgray mb-3x mb-5x_lg">{post.title}</h2>
          <p className="flex flex-wrap align-center mb-4x mb-5x_lg">
            <span className="post-date text-nowrap">
              {screenSize.width <= 1200 && <span>Published:</span>} {getFullDate(post.publishedAt)}
            </span>
            <span className="post-reading text-nowrap">{post.reading} min read</span>
            <span className="flex icons-wrapper">
              {user?.auth0User && (
                <span className="post-like">
                  <a
                    className={`pointer ${isLiked ? 'like-red' : ''}`}
                    onClick={(e) => {
                      postLikesHandler(e, post, user?.sanityUser, user?.auth0User, isLiked)
                      setIsLiked(!isLiked)
                    }}
                  >
                    <SVG content={likeIcon()} size={24} />
                  </a>
                </span>
              )}
              <span className="post-reply ml-2x">
                <ShareGroup />
              </span>
            </span>
          </p>
        </div>
        <div className="mainImageWrapper notAbsolute mb-4x mb-5x_lg">
          <Image
            src={`${getImageUrl(post.mainImage?.asset?._ref)}`}
            alt={post.mainImage?.alt}
            layout="fill"
          />
        </div>
        <div className="container article-wrapper article-content">
          {post.section.map((section, index) => {
            return (
              <div
                key={section.identifier.current}
                id={section.identifier.current}
                className="mb-5x article-section"
              >
                <BlockContent
                  blocks={section.content}
                  serializers={serializers}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                />
                {post.section.length >= 3 && index === post.section.length - 2 && (
                  <>
                    <div className="reviews-block mx-auto mw-50rem pt-8x pt-11x_lg mb-6x mb-11x_lg">
                      <h3 className="h3 review weight-800 relative mb-0 color-darkgray pt-6x pb-4x pt-7x_lg pb-7x_lg pseudo_before pseudo_after">
                        {review}
                      </h3>
                      <h4 className="h4 name bold color-darkgray mb-1x">{author}</h4>
                      <p>{position}</p>
                    </div>
                  </>
                )}
              </div>
            )
          })}
          <hr
            className="mb-2x"
            style={{ borderTop: '1px solid rgba(75, 74, 91, 0.2)', borderBottom: 'none' }}
          />
          <div className="flex flex-wrap align-center mb-8x mb-9x_lg">
            <span className="post-share-rate flex-1">Rate and share the article</span>
            <span className="flex icons-wrapper">
              {user?.auth0User && (
                <span className="post-like">
                  <a
                    className={`pointer ${isLiked ? 'like-red' : ''}`}
                    onClick={(e) => {
                      postLikesHandler(e, post, user?.sanityUser, user?.auth0User, isLiked)
                      setIsLiked(!isLiked)
                    }}
                  >
                    <SVG content={likeIcon()} size={24} />
                  </a>
                </span>
              )}
              <span className="post-reply ml-2x">
                <ShareGroup />
              </span>
            </span>
          </div>
        </div>
        <div className="container pb-6x pb-9x_lg">
          <Recommended />
        </div>
      </div>
    </>
  )
}
