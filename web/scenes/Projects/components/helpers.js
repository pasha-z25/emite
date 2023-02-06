import { useEffect, useState } from 'react'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { createNewSanityUser, getImageUrl, getUrlFromId, handleMutations } from '~/utils/helpers'
import { Color, projectsOptions } from '~/utils/constants'
import { useGlobalState } from '~/utils/state'
import { Loader } from '~/components/Loader'
import SVG from '~/components/SVG'
import { galleryIcon } from '~/utils/svgImages'

const fetchSvgParser = async (url) => {
  const response = await fetch(url)
  return response.text()
}

const getObjectType = groq`
    *[_type == $type && _id == $ref][0] {
      ...,
    }
  `

export const getProjectInfo = async (project, type = '') => {
  const references = {}
  const referencesIcon = {}

  references.category = await getClient().fetch(getObjectType, {
    type: 'projectCategory',
    ref: project.category?._ref,
  })
  references.partner = await getClient().fetch(getObjectType, {
    type: 'partner',
    ref: project.partner?._ref,
  })
  references.location = await getClient().fetch(getObjectType, {
    type: 'location',
    ref: project.location?._ref,
  })

  referencesIcon.categoryIcon = await fetchSvgParser(
    `${getImageUrl(references.category.image?.asset?._ref)}`
  ).then((svg) => svg)
  referencesIcon.partnerIcon = await fetchSvgParser(
    `${getImageUrl(references.partner.image?.asset?._ref)}`
  ).then((svg) => svg)
  referencesIcon.locationIcon = await fetchSvgParser(
    `${getImageUrl(references.location.countryImage?.asset?._ref)}`
  ).then((svg) => svg)

  if (references && referencesIcon) {
    return type ? [references[type], referencesIcon[`${type}Icon`]] : [references, referencesIcon]
  }
}

export const projectSubscribeHandler = (project, sanityUser, auth0User) => {
  const subscribeMutations = [
    {
      createIfNotExists: createNewSanityUser(auth0User),
    },
    {
      patch: {
        id: sanityUser._id,
        setIfMissing: {
          projects: [],
        },
        unset: [`projects[_key=="${project._id}"]`],
        insert: {
          after: 'projects[-1]',
          items: [
            {
              indexNumber: project.indexNumber,
              title: project.title,
              projectKey: project._id,
              publishedAt: project.publishedAt,
              _key: project._id,
            },
          ],
        },
      },
    },
  ]
  handleMutations(subscribeMutations)
}

export const useProjects = () => {
  const [toggle, setToggle] = useState(false)
  const [filterView] = useGlobalState('projectsFilter', projectsOptions.startFilterView)
  const [projects, setProjects] = useGlobalState('projects', [])

  const QUERY = groq`
    *[_type == "mission"${filterView}] {
      ...,partner->,category->,location->
    }
  `

  useEffect(async () => {
    setProjects(await getClient().fetch(QUERY))
  }, [filterView, toggle])

  return [projects, () => setToggle((old) => !old)]
}

export const mediaItem = (media, full = false) => {
  switch (media._type) {
    case 'imageCollection':
      return (
        <div className="image-wrapper image-radius-8" style={{ paddingTop: '57%' }}>
          {full && <SVG content={galleryIcon(Color.White)} size={24} className={'gallery-icon'} />}
          <Image
            src={`${getImageUrl(media.asset?._ref).width(750).height(450)}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )
    case 'mediaCollection':
      return (
        <div className="video-wrapper">
          {full && <SVG content={galleryIcon(Color.White)} size={24} className={'gallery-icon'} />}
          <video width="100%" controls={true}>
            <source src={getUrlFromId(media?.asset?._ref)} type="video/mp4" />
            Your browser doesn&apos;t support HTML5 video tag.
          </video>
        </div>
      )
    default:
      return (
        <div className="image-wrapper">
          <Loader />
        </div>
      )
  }
}
