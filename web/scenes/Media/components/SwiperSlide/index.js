import { useState, useEffect } from 'react'
import SVG from '~/components/SVG'
import { downloadIcon, likeIcon, replyIcon } from '~/utils/svgImages'
import { imageLikesHandler, imagesDownloadHandler, mediaItem } from '../helpers'
import { getImageUrl, getUrlFromId } from '~/utils/helpers'
import { Color } from '~/utils/constants'
import { ShareGroup } from '../ShareGroup'

export const SwiperSlideItem = ({ media, state, users }) => {
  const [shareGroupOpen, setShareGroupOpen] = state
  const [sanityUser, auth0User] = users
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    setIsLiked(sanityUser?.media?.some(({ mediaKey }) => mediaKey === media._key))
  }, [sanityUser])
  let currentLink = ''
  if (media._type === 'imageCollection') {
    currentLink = getImageUrl(media.asset?._ref)
  }
  if (media._type === 'mediaCollection') {
    currentLink = getUrlFromId(media.asset?._ref)
  }
  if (media._type === 'youtubeLink') {
    currentLink = media.link
  }
  return (
    <>
      <div style={{ display: shareGroupOpen ? 'none' : 'block' }} hidden={shareGroupOpen}>
        <div className="image-slide-item overflow-hidden relative">{mediaItem(media, true)}</div>
        <div className="action-group flex align-center justify-center mx-auto mt-2x max-content border-r20px">
          {media._type === 'imageCollection' && (
            <button
              className="mr-3x"
              style={{ lineHeight: '0.5' }}
              onClick={() => imagesDownloadHandler(getImageUrl(media.asset?._ref), media.caption)}
            >
              <SVG content={downloadIcon(Color.White)} size={24} />
            </button>
          )}
          {media._type === 'mediaCollection' && (
            <a
              href={getUrlFromId(media.asset?._ref)}
              target="_blank"
              rel="noopener noreferrer"
              download={media.caption}
              className="color-white mr-3x"
              style={{ lineHeight: '0.5' }}
            >
              <SVG content={downloadIcon(Color.White)} size={24} />
            </a>
          )}
          <a
            className={`pointer ${isLiked ? 'like-red' : ''}`}
            style={{ lineHeight: '0.5' }}
            onClick={(e) => {
              imageLikesHandler(e, media, sanityUser, auth0User, isLiked)
              setIsLiked(!isLiked)
            }}
          >
            <SVG content={likeIcon(Color.White)} size={24} />
          </a>
          <button
            className="ml-3x color-white"
            onClick={() => setShareGroupOpen(!shareGroupOpen)}
            style={{ lineHeight: '0.5' }}
          >
            <SVG content={replyIcon(Color.White)} size={24} />
          </button>
        </div>
      </div>
      {shareGroupOpen && (
        <div className="shared-wrapper">
          <ShareGroup link={currentLink} callback={() => setShareGroupOpen(!shareGroupOpen)} />
        </div>
      )}
    </>
  )
}
