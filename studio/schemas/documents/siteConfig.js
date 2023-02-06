export default {
  name: 'site-config',
  type: 'document',
  title: 'Site configuration',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  __experimental_actions: ['create', 'delete', 'update', 'publish'],
  fieldsets: [{ name: 'footer', title: 'Footer' }],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your site for search engines and social media.',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      title: 'Brand logo',
      description: 'Best choice is to use an SVG where the color are set with currentColor',
      name: 'logo',
      type: 'logo',
    },
    {
      name: 'authImages',
      title: '',
      description: '',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    },
    {
      name: 'termsAndConditions',
      type: 'portableText',
      fieldset: 'footer',
    },
    {
      name: 'privacyPolicy',
      type: 'portableText',
      fieldset: 'footer',
    },
  ],
}
