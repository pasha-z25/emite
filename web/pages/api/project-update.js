import admin from 'firebase-admin'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { getImageUrlFromMedia } from '~/utils/helpers'
import { notificationTypes } from '~/utils/constants'
import { notificationCredentials } from '~/utils/notification-server'

export default async function updateProjectNotification(req, res) {
  const projectUpdate = req.body.update
  const projectId = req.body.projectId

  console.log(projectUpdate)

  const getProjectSubscribers = groq`
    *[_type == "user" && length(tokens) > 0  && projects[projectKey == $key] && notificationsOptions.projectUpdatesStatus == true ] {
      tokens
    }
  `

  const getAllProjectsSubscribers = groq`
    *[_type == "user" && length(tokens) > 0 && notificationsOptions.projectUpdatesStatus == true ] {
      tokens
    }
  `

  try {
    let tokensResponse = []
    if (projectUpdate.subscribeStatus) {
      tokensResponse = await getClient().fetch(getProjectSubscribers, { key: projectId })
    } else {
      tokensResponse = await getClient().fetch(getAllProjectsSubscribers)
    }
    console.log(tokensResponse)
    let message = {
      notification: {
        title: projectUpdate.title,
        body: projectUpdate.content,
      },
      webpush: {
        notification: {
          icon: getImageUrlFromMedia(projectUpdate),
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
        data: JSON.stringify(projectUpdate),
        type: notificationTypes.PROJECT_UPDATES,
        url: projectUpdate.link ?? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
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
