import { useEffect, useState } from 'react'
import Link from 'next/link'
import SVG from '~/components/SVG'
import { useGlobalState } from '~/utils/state'
import { chevronRight, likeIcon, replyIcon } from '~/utils/svgImages'
import { getInternationalDate } from '~/utils/helpers'
import { notificationLikesHandler } from '~/scenes/Notifications/components/helpers'
import { ShareGroup } from '~/scenes/Blog/components/ShareGroup'

import styles from '../style.module.scss'

export const TextNotification = ({ notification }) => {
  const [user] = useGlobalState('user')
  const [shareGroupOpen, setShareGroupOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    setIsLiked(
      user?.sanityUser?.notifications?.some(
        ({ notificationKey }) => notificationKey === notification._key
      )
    )
  }, [user?.sanityUser])

  return (
    <>
      <div className="flex justify-between mb-3x">
        <h4 className="h4 bold color-darkgray">{notification.title}</h4>
        <p>{getInternationalDate(notification.publishedAt)}</p>
      </div>
      <p className="mb-3x">{notification.content}</p>
      <hr className="light mb-2x" />
      <div className="flex align-center justify-between">
        <div className={styles.wrapper}>
          <a
            className={`pointer ${isLiked ? 'like-red' : ''}`}
            style={{ lineHeight: '0.5' }}
            onClick={(e) => {
              notificationLikesHandler(e, notification, user?.sanityUser, user?.auth0User, isLiked)
              setIsLiked(!isLiked)
            }}
          >
            <SVG content={likeIcon()} size={24} />
          </a>
          {notification.link && 'window' in globalThis && (
            <span className={`post-reply ml-2x relative ${shareGroupOpen ? 'active' : ''}`}>
              <button type="button" onClick={() => setShareGroupOpen(!shareGroupOpen)}>
                <SVG content={replyIcon()} size={24} />
              </button>
              <span className="shareGroup-wrapper">
                <ShareGroup
                  link={
                    notification.link.includes('http')
                      ? notification.link
                      : `${window.location.origin}${notification.link}`
                  }
                  callback={() => setShareGroupOpen(!shareGroupOpen)}
                />
              </span>
            </span>
          )}
        </div>
        {notification.link && (
          <>
            {notification.link.includes('http') ? (
              <a
                href={notification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link color-darkgray"
              >
                Learn more
                <SVG content={chevronRight()} />
              </a>
            ) : (
              <Link href={notification.link}>
                <a className="arrow-link color-darkgray">
                  Learn more
                  <SVG content={chevronRight()} />
                </a>
              </Link>
            )}
          </>
        )}
      </div>
    </>
  )
}
