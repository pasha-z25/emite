const organizationEmail = 'giving@emite.org'
const organizationPhone = '+1 704-709-1255'
const organizationSchedule = 'Mon - Fri, 9am - 5pm EST'
const organizationLocation = 'https://goo.gl/maps/w3wRWZ7gRcvSMNoB6'
const socialFacebook = 'https://www.facebook.com/eMite.org'
const socialYoutube = 'https://www.youtube.com/channel/UClF0_HLJQ27icy0Z11Jek8Q'
const socialInstagram = 'https://www.instagram.com/emiteorg/'
const socialLinkedIn = 'https://www.linkedin.com/company/emiteorg/'
const socialAmazon = 'https://smile.amazon.com/ch/47-5605968'

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const monthsOfHheYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Direction = {
  UP: 'up',
  DOWN: 'down',
  NEUTRAL: 'neutral',
}

const Color = {
  DarkGray: '#4B4A5B',
  TransparentGray: 'rgba(75, 74, 91, 0.8)',
  Red: '#F94144',
  HoverRed: '#E21725',
  Green: '#12AF85',
  Blue: '#13D1FB',
  Yellow: '#FBE207',
  BgLight: '#FFFBF7',
  White: '#FFFFFF',
}
const Progress = {
  low: 40,
  medium: 90,
  full: 100,
}

const blogOptions = {
  defaultSorting: 'publishedAt desc',
  selectedSorting: 'Newest',
  startPostsLimit: 9,
  addNumberOfPosts: 6,
}

const mediaOptions = {
  startImagesLimit: 12,
  addNumberOfImages: 4,
}

const notificationOptions = {
  startNotificationsLimit: 7,
  addNumberOfNotifications: 5,
}

const projectsOptions = {
  startFilterView: '',
  startViewType: 'list',
}

const notificationTypes = {
  GLOBAL_UPDATES: 'GLOBAL_UPDATES',
  PROJECT_UPDATES: 'PROJECT_UPDATES',
  TRANSACTION_UPDATES: 'TRANSACTION_UPDATES',
}

const notificationStatuses = {
  MARKETING_STATUS: 'marketingStatus',
  NEW_PROJECT_STATUS: 'newProjectStatus',
  PROJECT_UPDATES_STATUS: 'projectUpdatesStatus',
  TRANSACTIONS_STATUS: 'transactionStatus',
  EMAIL_STATUS: 'emailStatus',
  TEXT_SMS_STATUS: 'textSmsStatus',
}

module.exports = {
  organizationEmail,
  organizationPhone,
  organizationSchedule,
  organizationLocation,
  socialFacebook,
  socialYoutube,
  socialInstagram,
  socialLinkedIn,
  socialAmazon,
  daysOfTheWeek,
  monthsOfHheYear,
  Direction,
  Color,
  Progress,
  blogOptions,
  mediaOptions,
  projectsOptions,
  notificationTypes,
  notificationOptions,
  notificationStatuses,
}
