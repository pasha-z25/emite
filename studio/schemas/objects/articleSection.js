export default {
  name: 'articleSection',
  type: 'document',
  title: 'Article section',
  fields: [
    {
      name: 'articleTitle',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      options: {
        maxLength: 30,
      },
      validation: (Rule) => Rule.error('Title is required').required(),
    },
    {
      name: 'identifier',
      type: 'slug',
      title: 'Identifier',
      description: 'Generate identifier for article navigation (without spaces)',
      options: {
        source: (_, { parent }) => parent.articleTitle,
        maxLength: 96,
      },
      validation: (Rule) => Rule.error('Click "Generate" button to generate a new slug').required(),
    },
    {
      name: 'content',
      title: 'Article content',
      type: 'bodyPortableText',
    },
  ],
}
