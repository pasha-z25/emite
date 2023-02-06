import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { list } from '@fluss/core'
import TimeAgo from 'react-timeago'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import SVG from '~/components/SVG'
import { bellOffIcon, bellOnIcon, chevronRight } from '~/utils/svgImages'
import { getImageUrl, getSubstringOfLength } from '~/utils/helpers'
import { Color, Progress } from '~/utils/constants'
import { FirebaseServices } from '~/utils/firebase'

import styles from './style.module.scss'
import { useGlobalState } from '~/utils/state'
import { NotificationActionButton } from '~/components/atomic_elements/Buttons'
import { onReadNotification } from '~/scenes/Notifications/components/helpers'

const showNotification = (notification) => {
  const mediaStyles = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '50px',
    height: '50px',
    borderRadius: '50px',
  }
  return (
    <li
      key={notification._key}
      className="list-item flex flex-wrap justify-between pl-6x pt-2x pr-3x pb-2x"
    >
      <div className="content flex-1 pr-2x">
        {notification.isNewNotification && <span className="list-circle"></span>}
        <p className="list-item-title bold small-text color-darkgray mb-2x">
          {getSubstringOfLength(notification.title, 60)}
        </p>
        {notification._type !== 'projectUpdateShort' && (
          <p className="small-text normal">
            <TimeAgo date={notification.publishedAt} live={false} />
          </p>
        )}
      </div>
      <div className={`additional ${notification._type === 'projectUpdateShort' && 'w-100'}`}>
        {['projectUpdateMedia', 'globalNotificationNewProject'].includes(notification._type) && (
          <div
            style={Object.assign({}, mediaStyles, {
              backgroundImage: `url(${
                notification.media[0].preview?.asset?._ref
                  ? `${getImageUrl(notification.media[0].preview.asset?._ref)}`
                  : `${getImageUrl(notification.media[0].asset?._ref)}`
              })`,
            })}
          />
        )}
        {notification._type === 'projectUpdateProgress' && (
          <p
            className="small-text bold"
            style={{
              color: (() => {
                if (notification.range < Progress.low) {
                  return Color.Red
                } else if (
                  notification.range >= Progress.low &&
                  notification.range < Progress.medium
                ) {
                  return Color.Yellow
                } else if (notification.range >= Progress.medium) {
                  return Color.Green
                } else {
                  return Color.DarkGray
                }
              })(),
            }}
          >
            {notification.range}%
          </p>
        )}
        {notification._type === 'projectUpdateShort' && notification.link && (
          <NotificationActionButton
            notification={notification}
            classList={'small'}
            popupNotification={true}
          />
        )}
      </div>
    </li>
  )
}

export const Notifications = () => {
  const [user] = useGlobalState('user')
  const [allNotifications, setNotifications] = useGlobalState('notifications', [])
  const [newNotification] = useGlobalState('newNotifications')
  const [newNotificationCounter, setNewNotificationsCount] =
    useGlobalState('newNotificationsCounter')
  const [notificationsList, setNotificationsList] = useState([])

  const [notificationWindowState, setNotificationWindowState] = useState(false)
  const notificationRef = useRef(null)

  useEffect(async () => {
    if (allNotifications?.length) {
      setNotificationsList(allNotifications.slice(0, 8))
    }
  }, [allNotifications])

  useEffect(() => {
    if (newNotification) {
      setNotificationsList((prevState) => [newNotification, ...prevState])
    }
  }, [newNotification])

  useEffect(() => {
    const bellListener = (event) => {
      if (
        notificationWindowState &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationWindowState(false)
        newNotificationCounter &&
          onReadNotification(user, setNotifications, setNewNotificationsCount)
      }
    }

    if (notificationRef.current) {
      document.addEventListener('click', bellListener)
    }
    return () => document.removeEventListener('click', bellListener)
  })

  const changeNotificationWindow = () => {
    setNotificationWindowState((prevState) => {
      if (prevState && newNotificationCounter) {
        onReadNotification(user, setNotifications, setNewNotificationsCount)
      }

      return !prevState
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className="notification-wrapper relative pb-2x flex" style={{ marginBottom: '-1rem' }}>
        <div className="flex" onClick={changeNotificationWindow}>
          <SVG
            content={newNotificationCounter ? bellOnIcon() : bellOffIcon()}
            size={24}
            className="pointer bell-icon"
          />
        </div>
        {notificationWindowState && (
          <div
            ref={notificationRef}
            className="list-wrapper bg-white border-r8px box-shadow absolute"
          >
            <ul className="list-none">
              {notificationsList.length ? (
                notificationsList.map((notification) => {
                  return (notification.subscribeStatus &&
                    user.sanityUser.projects?.some(({ _key }) => _key === notification.parentId)) ||
                    !notification.subscribeStatus
                    ? showNotification(notification)
                    : null
                })
              ) : (
                <li className="list-item text-center pr-6x pl-6x pt-3x pb-3x normal">
                  <p>No new messages</p>
                </li>
              )}
            </ul>
            <div className="text-center pt-2x pb-2x">
              <Link href="/notifications">
                <a className="bold faq-link arrow-link red justify-center">
                  View all updates
                  <SVG content={chevronRight(Color.Red)} />
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
