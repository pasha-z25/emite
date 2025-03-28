import React from 'react'

import { AiOutlineFileText } from 'react-icons/all'

export default {
  name: 'projectUpdateText',
  type: 'object',
  title: 'Update text',
  icon: AiOutlineFileText,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title should be catchy, descriptive, and not too long',
      validation: (Rule) => Rule.error('Title is required').required(),
    },
    {
      name: 'content',
      type: 'text',
      title: 'Text',
      validation: (Rule) => Rule.error('Text content is required').required(),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'link',
      type: 'url',
      title: 'External link',
      description: 'External link for more info',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
        }),
    },
    {
      name: 'subscribeStatus',
      type: 'boolean',
      title: 'Subscribe status',
      description: 'Set to true if only subscribers should view this update',
      initialValue: false,
      hidden: ({ document }) => document._type === 'generalNotifications',
    },
    {
      name: 'likes',
      title: 'Current likes',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      validation: (Rule) => Rule.integer(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      published: 'publishedAt',
      likes: 'likes',
    },
    prepare({ title = 'No title', published, likes }) {
      const imageUrl =
        'data:image/png;base64,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'
      return {
        media: <img src={imageUrl} alt={title} />,
        title,
        subtitle: `published ${new Date(published).toLocaleString()}${
          likes ? `, ${likes} likes` : ''
        }`,
      }
    },
  },
}
