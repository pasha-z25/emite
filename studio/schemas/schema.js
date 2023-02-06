// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import siteConfig from './documents/siteConfig'
import projectCategory from './documents/projectCategory'
import articleCategory from './documents/articleCategory'
import location from './documents/location'
import partner from './documents/partner'
import mission from './documents/mission'
import article from './documents/article'
import blog from './documents/blog'
import user from './documents/users'
import mediaGallery from './documents/mediaGallery'
import generalNotifications from './documents/generalNotifications'
import colorPalette from './documents/colorScheme'

// Object types
import logo from './objects/brandLogo'
import portableText from './objects/portableText'
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import mainImage from './objects/mainImage'
import imageCollection from './objects/imageCollection'
import mediaCollection from './objects/mediaCollection'
import youtubeLink from './objects/youtubeLink'
import partnerReference from './objects/partnerReference'
import articleSection from './objects/articleSection'
import postLike from './objects/postLike'
import mediaLike from './objects/mediaLike'
import notificationLike from './objects/notificationLike'
import projectSubscribe from './objects/projectSubscribe'
import projectUpdateText from './objects/projectUpdateText'
import projectUpdateMedia from './objects/projectUpdateMedia'
import projectUpdateProgress from './objects/projectUpdateProgress'
import projectUpdateShort from './objects/projectUpdateShort'
import userTokens from './objects/userTokens'
import userPayments from './objects/userPayments'
import globalNotificationNewProject from './objects/globalNonificationNewProject'
import userNotifications from './objects/userNotifications'
import userAddress from './objects/userAddress'
import userCard from './objects/userCard'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    siteConfig,
    projectCategory,
    articleCategory,
    location,
    partner,
    mission,
    article,
    blog,
    user,
    mediaGallery,
    generalNotifications,
    colorPalette,
    logo,
    portableText,
    bodyPortableText,
    bioPortableText,
    mainImage,
    imageCollection,
    mediaCollection,
    youtubeLink,
    partnerReference,
    articleSection,
    postLike,
    mediaLike,
    notificationLike,
    projectSubscribe,
    projectUpdateText,
    projectUpdateMedia,
    projectUpdateProgress,
    projectUpdateShort,
    userTokens,
    userPayments,
    globalNotificationNewProject,
    userNotifications,
    userAddress,
    userCard,
  ]),
})
