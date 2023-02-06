import { handleMutations } from '~/utils/helpers'

export default async function newProjectNotification(req, res) {
  try {
    const project = req.body
    console.log(project)
    const updateGlobalNotification = [
      {
        patch: {
          id: 'general-notifications',
          setIfMissing: {
            updates: [],
          },
          insert: {
            after: 'updates[-1]',
            items: [
              {
                _key: project._rev,
                _type: 'globalNotificationNewProject',
                title: project.title,
                content: project.description,
                publishedAt: project.publishedAt,
                link: `projects/${project.slug.current}` ?? null,
                media: [
                  {
                    _key: project._rev,
                    _type: 'imageCollection',
                    asset: {
                      _ref: project.mainImage.asset._ref,
                      _type: project.mainImage.asset._type,
                    },
                    caption: project.mainImage.caption,
                    date: project.publishedAt,
                    likes: 0,
                  },
                ],
              },
            ],
          },
        },
      },
    ]

    handleMutations(updateGlobalNotification)
      .then((response) => {
        console.log(response)
        res.status(200).json(response)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json(error)
      })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
