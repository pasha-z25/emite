import React from 'react'

export default {
  name: 'imageCollection',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields: [
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
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
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
      imageUrl: 'asset.url',
      title: 'caption',
      subtitle: 'likes',
    },
    prepare({ imageUrl, title = 'No title', subtitle }) {
      return {
        imageUrl,
        title,
        subtitle: `type: picture/image${subtitle ? `, ${subtitle} likes` : ''}`,
      }
    },
  },
}
