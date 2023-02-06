export default {
  name: 'mainImage',
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
      validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
  validation: (Rule) => Rule.error('Please, select image').required(),
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
    },
  },
}
