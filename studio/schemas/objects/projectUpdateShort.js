import React from 'react'

import { AiOutlineHighlight } from 'react-icons/all'

export default {
  name: 'projectUpdateShort',
  type: 'object',
  title: 'Update short',
  icon: AiOutlineHighlight,
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
      hidden: true,
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'important',
      type: 'boolean',
      title: 'Importance status',
      description: 'Enable if this update is really important',
      initialValue: false,
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
      name: 'color',
      title: 'Button color',
      type: 'reference',
      to: {
        type: 'colorPalette',
      },
      hidden: ({ parent }) => parent?.important,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          return !value && context.document.important
            ? 'You must select the color of the button'
            : true
        }).error(),
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
      important: 'important',
      likes: 'likes',
    },
    prepare({ title = 'No title', published, important, likes }) {
      const imageUrl =
        'data:image/png;base64,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'
      return {
        media: <img src={imageUrl} alt={title} />,
        title,
        subtitle: `published ${new Date(published).toLocaleString()}${
          likes ? `, ${likes} likes` : ''
        }${important ? ', Important!' : ''}`,
      }
    },
  },
}
