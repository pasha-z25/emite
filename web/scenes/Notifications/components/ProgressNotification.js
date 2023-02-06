import { useEffect, useState } from 'react'
import Link from 'next/link'
import SVG from '~/components/SVG'
import { useGlobalState } from '~/utils/state'
import { chevronRight, likeIcon, replyIcon } from '~/utils/svgImages'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { getCurrencyValue, getInternationalDate } from '~/utils/helpers'
import { notificationLikesHandler } from '~/scenes/Notifications/components/helpers'
import { Color, Progress } from '~/utils/constants'
import { ShareGroup } from '~/scenes/Blog/components/ShareGroup'

import 'react-circular-progressbar/dist/styles.css'
import styles from '../style.module.scss'

const CircularProgressbarStyles = {
  width: '100%',
  maxWidth: '75px',
  textAlign: 'center',
}

export const ProgressNotification = ({ notification, necessary = 100 }) => {
  const [user] = useGlobalState('user')
  const [shareGroupOpen, setShareGroupOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const textColor = Color.DarkGray
  const percentage = notification.range || 0
  const pathColor = ((percentage) => {
    if (percentage < Progress.low) {
      return Color.Red
    } else if (percentage >= Progress.low && percentage < Progress.medium) {
      return Color.Yellow
    } else if (percentage >= Progress.medium) {
      return Color.Green
    } else {
      return Color.DarkGray
    }
  })(percentage)
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
      <div className="flex align-center pt-1x mb-4x">
        <div className="mr-3x" style={CircularProgressbarStyles}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransitionDuration: 1.5,
              pathTransition: 'stroke-dashoffset 3s ease 0s',
              trailColor: '#EBEEF2',
              textColor,
              pathColor,
            })}
          />
        </div>
        <div>
          <p className="bold mb-1x">{notification.rangeTitle}</p>
          <p className="small-text">
            {percentage}% Raised of {getCurrencyValue(necessary)}
          </p>
        </div>
      </div>
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
