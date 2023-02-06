export default {
  name: 'partnerReference',
  type: 'object',
  title: 'Partner reference',
  fields: [
    {
      name: 'partner',
      type: 'reference',
      to: [
        {
          type: 'partner',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'partner.name',
      media: 'partner.image.asset',
    },
  },
}
