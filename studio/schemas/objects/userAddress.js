export default {
  name: 'userAddress',
  type: 'object',
  title: 'User address',
  fields: [
    {
      name: 'country',
      type: 'string',
      title: 'Country',
    },
    {
      name: 'state',
      type: 'string',
      title: 'State',
    },
    {
      name: 'city',
      type: 'string',
      title: 'City',
    },
    {
      name: 'line1',
      type: 'string',
      title: 'Street, apt.',
    },
    {
      name: 'postalCode',
      type: 'number',
      title: 'Postal code',
    },
  ],
}
