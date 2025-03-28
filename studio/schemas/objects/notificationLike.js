import React from 'react'

export default {
  name: 'notificationLike',
  type: 'object',
  title: 'Notification',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      readOnly: true,
    },
    {
      name: 'notificationKey',
      type: 'string',
      title: 'Key',
      readOnly: true,
    },
    {
      name: 'notificationType',
      type: 'string',
      title: 'Type',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'notificationKey',
      type: 'notificationType',
    },
    prepare({ title = 'No title', subtitle, type }) {
      let updateType = ''
      switch (type) {
        case 'projectUpdateText':
          updateType = 'Text'
          break
        case 'projectUpdateMedia':
          updateType = 'Media'
          break
        case 'projectUpdateProgress':
          updateType = 'Progress'
          break
        case 'projectUpdateShort':
          updateType = 'Short'
          break
        default:
          updateType = 'Text'
      }
      const imageUrl =
        'data:image/png;base64,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'
      return {
        media: <img src={imageUrl} alt={title} />,
        title,
        subtitle: `Key: ${subtitle}, type: ${updateType}`,
      }
    },
  },
}
