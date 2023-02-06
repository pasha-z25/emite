import { useEffect, useState } from 'react'
import { debounce } from '@fluss/core'
import { showNotification } from './components/helpers'
import { useGlobalState } from '~/utils/state'
import { notificationOptions } from '~/utils/constants'

const intervalFunction = debounce((predicate, reFetchPosts) => {
  if (window.pageYOffset > document.body.clientHeight - window.innerHeight * 2) {
    if (predicate) {
      reFetchPosts()
    }
  }
}, 20)

export const NotificationsPage = () => {
  const [user] = useGlobalState('user')
  const [notificationList, setNotificationList] = useState([])
  const [allNotifications] = useGlobalState('notifications', [])
  const [newNotification] = useGlobalState('newNotifications')

  useEffect(() => {
    if (newNotification) {
      setNotificationList((prevState) => [newNotification, ...prevState])
    }
  }, [newNotification])

  useEffect(() => {
    if (
      notificationList.length < notificationOptions.addNumberOfNotifications &&
      allNotifications
    ) {
      setNotificationList(allNotifications.slice(0, notificationOptions.addNumberOfNotifications))
    }

    const scrollHandler = () => {
      intervalFunction(allNotifications.length > notificationList.length, () =>
        setNotificationList((prevState) => {
          return allNotifications.slice(
            0,
            prevState.length + notificationOptions.addNumberOfNotifications
          )
        })
      )
    }

    if ('window' in globalThis) {
      window.addEventListener('scroll', scrollHandler)
    }
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [allNotifications])

  return (
    <>
      <div className="container pt-6x pb-9x">
        {notificationList.map((update) => {
          return (update.subscribeStatus &&
            user.sanityUser.projects?.some(({ _key }) => _key === update.parentId)) ||
            !update.subscribeStatus
            ? showNotification(update, 100)
            : null
        })}
      </div>
    </>
  )
}
