import admin from 'firebase-admin'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { getImageUrlFromMedia } from '~/utils/helpers'
import { notificationCredentials } from '~/utils/notification-server'
import { notificationTypes } from '~/utils/constants'

export default async function updateGlobalNotification(req, res) {
  const getNotificationsWithProjects = groq`
    *[_type == "user" && length(tokens) > 0 && notificationsOptions.newProjectStatus == true]  {
      tokens
    }
  `

  const getAllNotifications = groq`
    *[_type == "user" && length(tokens) > 0]  {
      tokens
    }
  `
  try {
    let tokensResponse = []
    const notification = req.body.update
    console.log(notification)

    if (notification._type === 'globalNotificationNewProject') {
      tokensResponse = await getClient().fetch(getNotificationsWithProjects)
    } else {
      tokensResponse = await getClient().fetch(getAllNotifications)
    }

    let message = {
      notification: {
        title: notification.title,
        body: notification.content,
      },
      webpush: {
        notification: {
          icon: getImageUrlFromMedia(notification),
        },
      },
      tokens: [
        ...new Set(
          tokensResponse
            .map((userToken) => userToken.tokens.map((tokenObj) => tokenObj.token))
            .flat()
        ),
      ],
      data: {
        data: JSON.stringify(notification),
        type: notificationTypes.GLOBAL_UPDATES,
        url: notification.link ?? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
      },
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(notificationCredentials()),
      })
    }

    if (tokensResponse.length > 0) {
      admin
        .messaging()
        .sendMulticast(message)
        .then((response) => {
          console.log(response)
          res.status(200).json(response)
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json(error)
        })
    } else res.status(200).json('no subscribers')
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
