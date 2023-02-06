import {
  educationIcon,
  asiaIcon,
  childrenIcon,
  usaIcon,
  waterIcon,
  africaIcon,
  feetIcon,
  healthIcon,
  IndiaFlag,
  USAFlag,
  EthiopiaFlag,
  UgandaFlag,
  MalawiFlag,
} from '~/utils/svgImages'
import { Color } from '~/utils/constants'
import staticText from '~/assets/text-content/static.json'

export const menu = [
  { title: staticText.menuOrganization, path: '/organization' },
  { title: staticText.menuJoinUs, path: '/join-us' },
  { title: staticText.menuResources, path: '/resources' },
  { title: staticText.menuBlog, path: '/blog' },
  { title: staticText.menuSupport, path: '/support' },
]

export const authMenu = [
  { title: staticText.menuMedia, path: '/media' },
  { title: staticText.menuProjects, path: '/projects' },
  { title: staticText.menuResources, path: '/resources' },
  { title: staticText.menuBlog, path: '/blog' },
]

export const authMenuMobile = [
  { title: staticText.menuResources, path: '/resources' },
  { title: staticText.menuBlog, path: '/blog' },
  { title: 'Settings', path: '/settings' },
  { title: 'Support', path: '/support' },
]

export const projectSlides = [
  {
    slideTitle: 'Project 15: Book Bags of Blessings - Hyderabad',
    slideDescription:
      'We blessed over 2,000 children with school supplies & a quality book bag in order to attend the public school. By getting an education, they have a chance to break the cycle of poverty.',
    imageUrl: '/images/projects/Project_15.png',
    imageAlt: 'Book Bags of Blessings - Hyderabad',
    category: 'Education',
    categoryIcon: educationIcon(Color.DarkGray),
    location: 'Hyderabad, India',
    locationIcon: asiaIcon(Color.DarkGray),
    peopleServed: '2000+',
  },
  {
    slideTitle: 'Project 13: Footwear Outreach for Martin Luther King Day',
    slideDescription:
      'In partnership with Young Black Leadership Alliance (YBLA) and Samaritan’s Feet, we provided shoes and socks to 316 students at Hidden Valley Elementary School in Charlotte where around 40% of students live in poverty & 20% are homeless. Now they can stand proud in their new shoes on Martin Luther King Day!',
    imageUrl: '/images/projects/Project_13.png',
    imageAlt: 'Footwear Outreach for Martin Luther King Day',
    category: 'Child Development',
    categoryIcon: childrenIcon(Color.DarkGray),
    location: 'Charlotte, North Carolina',
    locationIcon: usaIcon(Color.DarkGray),
    peopleServed: '300+',
  },
  {
    slideTitle: 'Project 20: Well of Hope',
    slideDescription:
      'Rain, hail or shine, the people of Gola Chefe were walking two hours a day to access safe drinking water. In collaboration with Lifewater,  we dug a well in Gola Chefe to provide clean water, new hope, and a transformation to this remote community.',
    imageUrl: '/images/projects/Project_20.png',
    imageAlt: 'Well of Hope',
    category: 'Health & Hygiene',
    categoryIcon: waterIcon(Color.DarkGray),
    location: 'Gola Chefe, Ethiopia',
    locationIcon: africaIcon(Color.DarkGray),
    peopleServed: '300+',
  },
  {
    slideTitle: 'Project 24: Zero Jiggers',
    slideDescription:
      "We are continuing to support the incredible work of Sole Hope & their Zero Jiggers campaign focused on jigger parasite removal from people's feet, shoe supplies to prevent continued infection & training on how they can live parasite-free.",
    imageUrl: '/images/projects/Project_24.png',
    imageAlt: 'Zero Jiggers',
    category: 'Health & Hygiene',
    categoryIcon: feetIcon(Color.DarkGray),
    location: 'Jinja, Uganda',
    locationIcon: africaIcon(Color.DarkGray),
    peopleServed: '2400',
  },
  {
    slideTitle: 'Project 30: Empowering Women’s Futures',
    slideDescription:
      "We supported part of a multiphase pilot program facilitated by our partner Days for Girls. Evidence shows that girls who can't afford products to manage their menstrual hygiene skip school. To restore dignity & proper hygiene, we distributed menstrual hygiene packs to over 1,300 impoverished girls throughout Malawi",
    imageUrl: '/images/projects/Project_30.png',
    imageAlt: 'Empowering Women’s Futures',
    category: 'Health & Hygiene',
    categoryIcon: healthIcon(Color.DarkGray),
    location: 'Malawi',
    locationIcon: africaIcon(Color.DarkGray),
    peopleServed: '1300',
  },
]

export const reviewsList = [
  {
    review:
      'Simply put, Mite advances the common good across the world. They do it in a manner that makes me, as a donor, proud.',
    author: 'Steve M.',
    position: 'Giver',
  },
  {
    review:
      'As an Mite donor for over two years, I am consistently impressed by the level of transparency and purpose-driven work accomplished.',
    author: 'George M.',
    position: 'Giver',
  },
  {
    review: 'Mite is genuinely interested in empowering the poor and the needy. I love it',
    author: 'Shavaji K.',
    position: 'Giver',
  },
  {
    review:
      'If you are considering partnering with Mite then please hesitate no more. We (Lifewater.org) loved our collaboration. What a great organization to invest in',
    author: 'Daren W.',
    position: 'Partner',
  },
  {
    review:
      "Mite is the kind of organization everyone wants to have as a partner. They were practical and impactful - the kind you always need, but you don't always get.",
    author: 'Amy C.',
    position: 'Partner',
  },
]

export const paymentPriceList = [
  {
    value: '0',
    title: 'Price',
  },
  {
    value: '10',
    title: '$10',
  },
  {
    value: '25',
    title: '$25',
  },
  {
    value: '50',
    title: '$50',
  },
  {
    value: '100',
    title: '$100',
  },
  {
    value: 'other',
    title: '$Other',
  },
]

export const paymentIntervalList = [
  {
    value: '0',
    title: 'Interval',
  },
  {
    value: 'weekly',
    title: 'Weekly',
  },
  {
    value: 'monthly',
    title: 'Monthly',
  },
  {
    value: 'annually',
    title: 'Annually',
  },
  {
    value: 'one-time',
    title: 'One-time',
  },
]

export const globeMarkers = [
  {
    _id: '470ee334-1703-449c-8d27-Project_15',
    title: 'Project 15: Book Bags of Blessings - Hyderabad',
    partner: {
      name: 'Сharitywater',
    },
    categories: {
      title: 'Education',
    },
    peopleServed: '2000+',
    color: 'red',
    location: {
      latitude: 17.4122998,
      longitude: 78.267961,
    },
    flag: IndiaFlag(),
  },
  {
    _id: '470ee334-1703-449c-8d27-Project_13',
    title: 'Project 13: Footwear Outreach for Martin Luther King Day',
    partner: {
      name: 'Сharitywater',
    },
    categories: {
      title: 'Child Development',
    },
    peopleServed: 300,
    color: 'red',
    location: {
      latitude: 35.2030728,
      longitude: -80.9799121,
    },
    flag: USAFlag(),
  },
  {
    _id: '470ee334-1703-449c-8d27-Project_20',
    title: 'Project 20: Well of Hope',
    partner: {
      name: 'Сharitywater',
    },
    categories: {
      title: 'Health & Hygiene',
    },
    peopleServed: 300,
    color: 'red',
    location: {
      latitude: 6.1596273,
      longitude: 38.1942271,
    },
    flag: EthiopiaFlag(),
  },
  {
    _id: '470ee334-1703-449c-8d27-Project_24',
    title: 'Project 24: Zero Jiggers',
    partner: {
      name: 'Сharitywater',
    },
    categories: {
      title: 'Health & Hygiene',
    },
    peopleServed: 2400,
    color: 'red',
    location: {
      latitude: 0.4454674,
      longitude: 33.1971583,
    },
    flag: UgandaFlag(),
  },
  {
    _id: '470ee334-1703-449c-8d27-Project_30',
    title: 'Project 30: Empowering Women’s Futures',
    partner: {
      name: 'Сharitywater',
    },
    categories: {
      title: 'Health & Hygiene',
    },
    peopleServed: 1300,
    color: 'red',
    location: {
      latitude: -13.2385728,
      longitude: 32.051565,
    },
    flag: MalawiFlag(),
  },
]
