import S from '@sanity/desk-tool/structure-builder'
import { BsGear, AiOutlineNotification } from 'react-icons/all'

// We filter document types defined in structure to prevent them from being listed twice
const hiddenDocTypes = (listItem) =>
  ![
    'site-config',
    'mission',
    'article',
    'blog',
    'user',
    'projectCategory',
    'articleCategory',
    'partner',
    'location',
    'articleSection',
    'mediaGallery',
    'generalNotifications',
    'colorPalette',
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Site config')
        .icon(BsGear)
        .child(S.editor().id('config').schemaType('site-config').documentId('global-config')),
      S.listItem()
        .title('Projects')
        .schemaType('mission')
        .child(S.documentTypeList('mission').title('Project')),
      S.listItem()
        .title('Resources')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Resource')),
      S.listItem().title('Blog').schemaType('blog').child(S.documentTypeList('blog').title('Blog')),
      S.listItem()
        .title('Partners')
        .schemaType('partner')
        .child(S.documentTypeList('partner').title('Partner')),
      S.listItem()
        .title('Projects categories')
        .schemaType('projectCategory')
        .child(S.documentTypeList('projectCategory').title('Project category')),
      S.listItem()
        .title('Resources categories')
        .schemaType('articleCategory')
        .child(S.documentTypeList('articleCategory').title('Article category')),
      S.listItem()
        .title('Locations')
        .schemaType('location')
        .child(S.documentTypeList('location').title('Location')),
      S.listItem()
        .title('Users')
        .schemaType('user')
        .child(S.documentTypeList('user').title('User')),
      S.listItem()
        .title('Media gallery')
        .schemaType('mediaGallery')
        .child(S.documentTypeList('mediaGallery').title('Group of gallery')),
      S.listItem()
        .title('Notifications')
        .icon(AiOutlineNotification)
        .child(
          S.editor()
            .id('notifications')
            .schemaType('generalNotifications')
            .documentId('general-notifications')
        ),
      // S.listItem()
      //   .title('Notifications')
      //   .icon(AiOutlineNotification)
      //   .schemaType('generalNotifications')
      //   .child(S.documentTypeList('generalNotifications').title('Notifications')),
      S.listItem()
        .title('Color palette')
        .schemaType('colorPalette')
        .child(S.documentTypeList('colorPalette').title('Color')),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
