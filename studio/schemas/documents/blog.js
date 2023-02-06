import { IoNewspaperOutline } from 'react-icons/all'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  icon: IoNewspaperOutline,
  fieldsets: [{ name: 'useful', title: 'The article statistics' }],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      validation: (Rule) => Rule.error('The title is required').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.error('Click "Generate" button to generate a new slug').required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Short introductory text for cards and article page',
      validation: (Rule) => Rule.error('The description is required').required(),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published',
      description: 'Select the date to be displayed (as published) in the post',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'reading',
      title: 'Reading time',
      description: 'Estimated time to read the article (in minutes)',
      type: 'number',
      initialValue: 3,
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
      validation: (Rule) => Rule.error('Image is required').required(),
    },
    {
      name: 'section',
      type: 'array',
      title: 'Article sections',
      of: [
        {
          type: 'articleSection',
        },
      ],
      validation: (Rule) =>
        Rule.error('Please, fill in at least one section for the article').required(),
    },
    {
      name: 'views',
      title: 'Views',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      fieldset: 'useful',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      fieldset: 'useful',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      views: 'views',
      likes: 'likes',
    },
    prepare({ title = 'No title', media, views = 0, likes = 0 }) {
      return {
        media,
        title,
        subtitle: `${views} views, ${likes} likes`,
      }
    },
  },
}
