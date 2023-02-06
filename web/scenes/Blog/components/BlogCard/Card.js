import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SVG from '~/components/SVG'
import { likeIcon, replyIcon } from '~/utils/svgImages'
import { getImageUrl, getShortDate, getSubstringOfLength } from '~/utils/helpers'
import { postLikesHandler } from '~/scenes/Blog'
import { ShareGroup } from '~/scenes/Blog/components/ShareGroup'

import styles from './style.module.scss'

export const PostCard = ({ post, users }) => {
  const [shareGroupOpen, setShareGroupOpen] = useState(false)
  const [sanityUser, auth0User] = users
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (sanityUser) {
      setIsLiked(sanityUser.posts?.some(({ postKey }) => postKey === post._id) || false)
    }
  }, [sanityUser])

  return (
    <>
      <div className={`${styles.card} post-card flex flex-wrap`}>
        <div className="image-wrapper w-100 __notAbsolute">
          <Link href={`/blog/${post.slug.current}`}>
            <a className="image-link relative">
              <Image
                src={`${getImageUrl(post.mainImage?.asset?._ref).width(624).height(372)}`}
                alt={post.mainImage?.alt}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="border-r20px"
              />
            </a>
          </Link>
        </div>
        <div className="text-wrapper">
          <h4 className="h4 title color-darkgray mb-3x">
            <Link href={`/blog/${post.slug.current}`}>
              <a>{post.title}</a>
            </Link>
          </h4>
          <p className="description mb-3x">{getSubstringOfLength(post.description, 170)}</p>
          <p className="small-text flex align-center">
            <span className="post-date">{getShortDate(post.publishedAt)}</span>
            <span className="post-reading">
              {post.reading} min read
              {/*(views: {post.views}, likes: {post.likes})*/}
            </span>
            {auth0User && (
              <span className="post-like">
                <a
                  className={`pointer ${isLiked ? 'like-red' : ''}`}
                  onClick={(e) => {
                    postLikesHandler(e, post, sanityUser, auth0User, isLiked)
                    setIsLiked(!isLiked)
                  }}
                >
                  <SVG content={likeIcon()} size={24} />
                </a>
              </span>
            )}
            <span className={`post-reply ml-2x relative ${shareGroupOpen ? 'active' : ''}`}>
              <button type="button" onClick={() => setShareGroupOpen(!shareGroupOpen)}>
                <SVG content={replyIcon()} size={24} />
              </button>
              <span className="shareGroup-wrapper">
                <ShareGroup
                  link={
                    'window' in globalThis
                      ? `${window.origin}/blog/${post.slug.current}`
                      : `/blog/${post.slug.current}`
                  }
                  callback={() => setShareGroupOpen(!shareGroupOpen)}
                />
              </span>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
