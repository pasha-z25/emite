import { BiGlobe } from 'react-icons/all'
import AssetSource from 'part:sanity-plugin-media-library/asset-source'

export default {
  name: 'mission',
  type: 'document',
  title: 'Missions',
  icon: BiGlobe,
  fieldsets: [
    { name: 'references', title: 'References' },
    { name: 'additionally', title: 'Additionally' },
  ],
  fields: [
    {
      name: 'indexNumber',
      title: 'Index number',
      type: 'number',
      initialValue: 0,
      validation: (Rule) =>
        Rule.error('Specify the current index of the project').required().integer().min(1),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      validation: (Rule) => Rule.error('Specify the title of the project').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Will require a slug to be set to be able to show the project',
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
      validation: (Rule) => Rule.error('Should be the short description of the project').required(),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published',
      description: 'Select the date to be displayed (as published) in the project',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'paymentApiId',
      type: 'string',
      title: 'Stripe product API ID',
      description: 'Enter the product API ID obtained from Stripe',
      validation: (Rule) =>
        Rule.error('The Stripe product API ID is required for payment').required(),
    },
    {
      name: 'activityStatus',
      type: 'boolean',
      title: 'Activity status',
      description: 'Set activity status for projects filter',
      initialValue: true,
    },
    {
      name: 'completionDate',
      type: 'date',
      title: 'Completion date',
      description: 'Select the date to be displayed (as closed) in the project',
      hidden: ({ parent }) => parent?.activityStatus,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          return !value && !context.document.activityStatus
            ? 'You must indicate the completion date of the project'
            : true
        }).error(),
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
      validation: (Rule) => Rule.error('Image is required').required(),
    },
    {
      name: 'media',
      type: 'array',
      title: 'Media collection',
      initialValue: [],
      options: { sources: [AssetSource] },
      of: [
        {
          type: 'mediaCollection',
          options: { accept: 'video/mp4' },
        },
        {
          type: 'imageCollection',
          options: { sources: [AssetSource] },
        },
        {
          type: 'youtubeLink',
        },
      ],
    },
    {
      name: 'partner',
      title: 'Partner',
      fieldset: 'references',
      type: 'reference',
      to: {
        type: 'partner',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      fieldset: 'references',
      type: 'reference',
      to: {
        type: 'projectCategory',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      fieldset: 'references',
      type: 'reference',
      to: {
        type: 'location',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'markerColor',
      title: 'Marker color',
      description: 'Specify the color of the marker on the globe (is required!)',
      type: 'color',
      validation: (Rule) =>
        Rule.error('The color of the marker on the globe is required!').required(),
    },
    {
      name: 'served',
      title: 'People served',
      description: 'Indicate, how many people will help',
      type: 'number',
      initialValue: 200,
      fieldset: 'additionally',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'amountRaised',
      title: 'Necessary amount raised',
      description: 'Indicate, full necessary sum ($)',
      type: 'number',
      initialValue: 100,
      fieldset: 'additionally',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alreadyCollected',
      title: 'Amount raised',
      description: 'How much are collected (%)',
      type: 'number',
      initialValue: 1,
      fieldset: 'additionally',
      validation: (Rule) => Rule.required().integer().min(1).max(100),
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body',
    },
    {
      name: 'updates',
      type: 'array',
      title: 'Updates',
      initialValue: [],
      of: [
        {
          type: 'projectUpdateText',
        },
        {
          type: 'projectUpdateMedia',
        },
        {
          type: 'projectUpdateProgress',
        },
      ],
    },
    {
      name: 'sendNotificationNow',
      type: 'boolean',
      title: 'Send notification to all users',
      description:
        'If you want to send notifications to all users about this project, enable this option.',
      initialValue: true,
    },
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      published: 'publishedAt',
      index: 'indexNumber',
    },
    prepare({ title = 'No title', media, published, index }) {
      return {
        media,
        title: `#${index} ${title}`,
        subtitle: `published ${new Date(published).toLocaleString()}`,
      }
    },
  },
}
