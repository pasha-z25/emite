import { IoAppsOutline } from 'react-icons/all'

export default {
  name: 'projectCategory',
  type: 'document',
  title: 'Project categories',
  icon: IoAppsOutline,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.error('The title is required').required(),
    },
    {
      name: 'image',
      title: 'Image',
      description: 'SVG picture to be used for the slides',
      type: 'image',
      accept: 'image/svg+xml',
      validation: (Rule) => Rule.error('Image is required').required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
