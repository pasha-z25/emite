import React from 'react'

export default {
  name: 'youtubeLink',
  type: 'object',
  title: 'YouTube',
  description: 'Link to video in YouTube',
  fields: [
    {
      name: 'preview',
      type: 'image',
      title: 'Image for preview',
      description: 'Will be show in preview.',
      validation: (Rule) => Rule.error('You have to fill out the image for preview.').required(),
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
      description: 'Link to video in YouTube.',
      validation: (Rule) => Rule.error('Link to video in YouTube is required.').required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Will be show in miniature.',
      validation: (Rule) => Rule.error('You have to fill out the caption text.').required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'likes',
      title: 'Current likes',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      validation: (Rule) => Rule.integer(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      imageUrl: 'preview.asset.url',
      title: 'caption',
      subtitle: 'likes',
    },
    prepare({ title = 'No title', subtitle, imageUrl }) {
      return {
        imageUrl,
        title,
        subtitle: `type: YouTube/link${subtitle ? `, ${subtitle} likes` : ''}`,
      }
    },
  },
}
