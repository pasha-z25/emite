import { BiBookOpen } from 'react-icons/all'

export default {
  name: 'article',
  type: 'document',
  title: 'Articles',
  icon: BiBookOpen,
  fieldsets: [{ name: 'useful', title: 'Is this article useful?' }],
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
      description: 'Will require a slug to be set to be able to show the article',
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
      description: 'Short introductory text for article page',
      validation: (Rule) => Rule.error('The description is required').required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {
        type: 'articleCategory',
      },
      validation: (Rule) => Rule.error('Category is required').required(),
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
      name: 'likes',
      title: 'Likes',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      fieldset: 'useful',
    },
    {
      name: 'dislikes',
      title: 'Dislikes',
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
      likes: 'likes',
      dislikes: 'dislikes',
    },
    prepare({ title = 'No title', media, likes = 0, dislikes = 0 }) {
      return {
        media,
        title,
        subtitle: `${likes} likes, ${dislikes} dislikes`,
      }
    },
  },
}
