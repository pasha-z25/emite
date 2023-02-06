import { useEffect } from 'react'
import { useGlobalState } from '~/utils/state'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { TextNotification } from '~/scenes/Notifications/components/TextNotification'
import { MediaNotification } from '~/scenes/Notifications/components/MediaNotification'
import { ProgressNotification } from '~/scenes/Notifications/components/ProgressNotification'
import { ShortNotification } from '~/scenes/Notifications/components/ShortNotification'
import { createNewSanityUser, handleMutations } from '~/utils/helpers'
import { FirebaseServices } from '~/utils/firebase'

export const showNotification = (notification, necessary = 0) => {
  return (
    <div
      key={notification._key}
      className={`notification-item mx-auto mb-3x border-r20px mw-50rem box-shadow bg-white pl-4x pr-4x pt-4x${
        notification._type === 'projectUpdateShort' && notification.important
          ? ' bg-red color-white pb-4x'
          : ' pb-3x'
      }${
        notification._type === 'projectUpdateShort' && !notification.important
          ? ' color-darkgray pb-4x'
          : ' pb-3x'
      }`}
    >
      {notification._type === 'projectUpdateText' && (
        <TextNotification notification={notification} />
      )}
      {['projectUpdateMedia', 'globalNotificationNewProject'].includes(notification._type) && (
        <MediaNotification notification={notification} />
      )}
      {notification._type === 'projectUpdateProgress' && (
        <ProgressNotification notification={notification} necessary={necessary} />
      )}
      {notification._type === 'projectUpdateShort' && (
        <ShortNotification notification={notification} />
      )}
    </div>
  )
}

export const notificationsRequest = () => {
  return groq`
  *[_type == "user" && _id == $userId][0]{
  "notifications":select(
    notificationsOptions.projectUpdatesStatus == false && notificationsOptions.newProjectStatus == true => *[_type in ["generalNotifications"] && length(updates) > 0]{
        updates[] {
          ...,
          "color": color->color.hex,
          "parentId":^._id,
          "isNewNotification": dateTime(^.^.lastNotificationsView) < dateTime(publishedAt)
        }
      }.updates,
    notificationsOptions.projectUpdatesStatus == true && notificationsOptions.newProjectStatus == false => *[_type in ["mission", "generalNotifications"] && length(updates) > 0]{
        updates[_type != "globalNotificationNewProject"] {
          ...,
          "color": color->color.hex,
          "parentId":^._id,
          "isNewNotification": dateTime(^.^.lastNotificationsView) < dateTime(publishedAt),
          "globalNotificationNewProject":false
        }
      }.updates,
       notificationsOptions.projectUpdatesStatus == false && notificationsOptions.newProjectStatus == false => *[_type in ["generalNotifications"] && length(updates) > 0]{
        updates[_type != "globalNotificationNewProject"] {
          ...,
          "color": color->color.hex,
          "parentId":^._id,
          "isNewNotification": dateTime(^.^.lastNotificationsView) < dateTime(publishedAt)
        }
      }.updates,
      *[_type in ["mission","generalNotifications"] && length(updates) > 0]
      {
        updates[] {
          ...,
          "color": color->color.hex,
          "parentId":^._id,
          "isNewNotification": dateTime(^.^.lastNotificationsView) < dateTime(publishedAt)
        }
      }.updates
  )}
  `
}

export const fetchNotifications = async (user, setNotifications, setNewNotificationCounter) => {
  const queryResult = await getClient().fetch(notificationsRequest(), {
    userId: user.auth0User.sub.replace('|', '-'),
  })

  let updates = []
  let notificationCounter = 0

  updates = queryResult.notifications
    .flat()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  notificationCounter = updates.reduce(
    (prevValue, update) => (update.isNewNotification ? prevValue + 1 : prevValue),
    notificationCounter
  )
  setNotifications(updates)
  setNewNotificationCounter(notificationCounter)
}

export const onReadNotification = (user, setNotifications, setNewNotificationsCount) => {
  const changeReadingDate = [
    {
      patch: {
        id: user.auth0User.sub.replace('|', '-'),
        set: {
          lastNotificationsView: new Date().toISOString(),
        },
      },
    },
  ]
  handleMutations(changeReadingDate).then((response) => {
    fetchNotifications(user, setNotifications, setNewNotificationsCount)
  })
}

export const useNotification = () => {
  const [user] = useGlobalState('user')
  const [notifications, setNotifications] = useGlobalState('notifications', [])
  const [, setNewNotification] = useGlobalState('newNotifications', null)
  const [, setNewNotificationCounter] = useGlobalState('newNotificationsCounter', 0)

  useEffect(() => {
    if (user) {
      fetchNotifications(user, setNotifications, setNewNotificationCounter)
    }
  }, [user])

  useEffect(async () => {
    const firebase = FirebaseServices.instance
    const globalBackgroundNotifications = (notification) => {
      notification.data.isNewNotification = true
      setNewNotification(notification.data)
      setNotifications((prevState) => {
        let newState = []
        newState.push(notification.data)
        if (prevState && prevState.length) {
          newState = newState.concat(prevState)
        }
        return newState
      })
      setNewNotificationCounter((prevState) => prevState + 1)
    }
    firebase.subscribeOnMessage('NOTIFICATIONS', globalBackgroundNotifications)

    return () => firebase.unsubscribe('NOTIFICATIONS')
  }, [])
  return [notifications, fetchNotifications]
}

export const notificationLikesHandler = (
  e,
  notification,
  sanityUser,
  auth0User,
  isLiked = false
) => {
  const likedMutations = [
    {
      createIfNotExists: createNewSanityUser(auth0User),
    },
    {
      patch: {
        id: notification.parentId,
        setIfMissing: {
          [`updates[_key=="${notification._key}"].likes`]: 0,
        },
        inc: {
          [`updates[_key=="${notification._key}"].likes`]: 1,
        },
      },
    },
    {
      patch: {
        id: sanityUser._id,
        setIfMissing: {
          notifications: [],
        },
        insert: {
          after: 'notifications[-1]',
          items: [
            {
              title: notification.title,
              notificationKey: notification._key,
              notificationType: notification._type,
              _key: notification._key,
            },
          ],
        },
      },
    },
  ]
  const dislikedMutations = [
    {
      patch: {
        id: notification.parentId,
        setIfMissing: {
          [`updates[_key=="${notification._key}"].likes`]: 0,
        },
        dec: {
          [`updates[_key=="${notification._key}"].likes`]: 1,
        },
      },
    },
    {
      patch: {
        id: sanityUser._id,
        unset: [`notifications[_key=="${notification._key}"]`],
      },
    },
  ]
  handleMutations(isLiked ? dislikedMutations : likedMutations)
  const link = e.target.closest('a')
  link.classList.add('like')
  link.classList.add('like-red')
  setTimeout(() => link.classList.remove('like'), 2500)
}
