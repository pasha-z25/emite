export default {
  name: 'userCard',
  type: 'object',
  title: 'User card',
  fields: [
    {
      name: 'cardNumber',
      type: 'string',
      title: 'Card number',
      description: 'Enter card number to format: xxxx-xxxx-xxxx-xxxx-xxxx',
      validation: (Rule) =>
        Rule.min(16).max(19).error('Enter card number to format: xxxx-xxxx-xxxx-xxxx-xxxx'),
    },
    {
      name: 'expDate',
      type: 'date',
      title: 'Exp date',
      options: {
        dateFormat: 'MM/YY',
      },
    },
    {
      name: 'secret',
      type: 'number',
      title: 'Secret (CVV2/CVС2)',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(100)
          .max(999)
          .error('Secret must be number from three numbers '),
    },
  ],
}
