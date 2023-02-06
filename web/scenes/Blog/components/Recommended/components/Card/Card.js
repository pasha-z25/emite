import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useResize from 'use-resizing'
import { getImageUrl, getShortDate, getSubstringOfLength } from '~/utils/helpers'
import SVG from '~/components/SVG'
import { likeIcon, replyIcon } from '~/utils/svgImages'
import { postLikesHandler } from '~/scenes/Blog'
import { ShareGroup } from '~/scenes/Blog/components/ShareGroup'

export const Card = ({ post, users }) => {
  const [sanityUser, auth0User] = users
  const [shareGroupOpen, setShareGroupOpen] = useState(false)
  const screenSize = useResize()
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (sanityUser) {
      setIsLiked(sanityUser.posts?.some(({ postKey }) => postKey === post._id) || false)
    }
  }, [sanityUser])

  return (
    <>
      <div className="mb-2x notAbsolute">
        <Image
          src={`${getImageUrl(post.mainImage).width(564).height(372)}`}
          alt={post.title}
          className="border-r20px"
          layout="fill"
        />
      </div>
      <Link href={`/blog/${post.slug.current}`}>
        <a className="h4 title color-darkgray bold mb-1x">{getSubstringOfLength(post.title, 52)}</a>
      </Link>
      {screenSize.width <= 1200 && (
        <p className="description mb-2x">{getSubstringOfLength(post.description, 170)}</p>
      )}
      <p className="flex flex-wrap align-center mb-4x mb-5x_lg">
        <span className="post-date">{getShortDate(post.publishedAt)}</span>
        <span className="post-reading">{post.reading} min read</span>
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
            <ShareGroup />
          </span>
        </span>
      </p>
    </>
  )
}
