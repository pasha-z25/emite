export default {
  name: 'userNotifications',
  type: 'object',
  title: 'User notifications options',
  fields: [
    {
      name: 'marketingStatus',
      type: 'boolean',
      title: 'Receive marketing notifications',
      description: 'Enable or disable marketing notifications',
      initialValue: true,
    },
    {
      name: 'projectUpdatesStatus',
      type: 'boolean',
      title: ' Receive project updates notifications',
      description: 'Enable or disable project updates notifications',
      initialValue: true,
    },
    {
      name: 'transactionStatus',
      type: 'boolean',
      title: 'Receive transaction notifications',
      description: 'Enable or disable transaction notifications',
      initialValue: true,
    },
    {
      name: 'newProjectStatus',
      type: 'boolean',
      title: 'Receive new project notifications',
      description: 'Enable or disable new projects notifications',
      initialValue: true,
    },
    {
      name: 'emailStatus',
      type: 'boolean',
      title: 'Receive email notifications',
      description: 'Enable or disable email notifications',
      initialValue: true,
    },
    {
      name: 'textSmsStatus',
      type: 'boolean',
      title: 'Receive sms notifications on mobile',
      description: 'Enable or disable sms notifications',
      initialValue: true,
    },
  ],
}
