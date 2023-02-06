import React from 'react'

export default {
  name: 'mediaCollection',
  type: 'file',
  title: 'Media',
  description: 'Allowed only mp4 files (please, click "Edit details" to add preview image)',
  options: {
    accept: 'video/mp4',
  },
  validation: (Rule) =>
    Rule.custom((file) => {
      const ref = file.asset._ref
      const [, , extension] = ref.split('-')
      return extension === 'mp4' ? true : 'File format is not valid. Please select video'
    }).error(),
  fields: [
    {
      name: 'preview',
      type: 'image',
      title: 'Image for preview',
      description: 'Will be show in preview.',
      validation: (Rule) =>
        Rule.error(
          'You have to fill out the image for preview. Click "Edit details" to add preview image'
        ).required(),
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
        subtitle: `type: video/mp4${subtitle ? `, ${subtitle} likes` : ''}`,
      }
    },
  },
}
