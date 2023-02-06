import { GoLocation } from 'react-icons/all'

export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  icon: GoLocation,
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
    },
    {
      name: 'countryImage',
      title: 'Country or continent image',
      description: 'SVG picture to be used for the slides',
      type: 'image',
      accept: 'image/svg+xml',
      validation: (Rule) => Rule.error('Image is required').required(),
    },
    {
      name: 'geoPointLocation',
      title: 'Geo point location',
      type: 'geopoint',
      validation: (Rule) => Rule.error('Geo point location is required for the globe').required(),
    },
    {
      name: 'countryFlag',
      title: 'Country flag',
      description: 'SVG picture to be used for the globe',
      type: 'image',
      accept: 'image/svg+xml',
      validation: (Rule) => Rule.error('Image is required').required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'countryImage',
    },
  },
}
