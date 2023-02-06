import { GiHumanPyramid } from 'react-icons/all'

export default {
  name: 'partner',
  type: 'document',
  title: 'Partners',
  icon: GiHumanPyramid,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.error('Name is required').required(),
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
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
}
