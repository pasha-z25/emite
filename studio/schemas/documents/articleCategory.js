import { AiOutlineAppstore } from 'react-icons/all'

export default {
  name: 'articleCategory',
  type: 'document',
  title: 'Article categories',
  icon: AiOutlineAppstore,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.error('The title is required').required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.error('The description is required').required(),
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      validation: (Rule) => Rule.error('Image is required').required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
