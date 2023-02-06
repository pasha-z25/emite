import { useState, useEffect } from 'react'
import { ListProject } from './ListProject'
import { GlobeProject } from './GlobeProject'
import { useGlobalState } from '~/utils/state'
import { projectsOptions } from '~/utils/constants'
import { listIcon, globeIcon } from '~/utils/svgImages'
import { getImageUrl } from '~/utils/helpers'
import { useProjects } from '~/scenes/Projects/components/helpers'
import { Dropdown } from '../Dropdown'

import styles from '../../style.module.scss'

const filtersList = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Personal',
    value: 'personal',
  },
  {
    title: 'Current',
    value: 'current',
  },
]

const viewsList = [
  {
    image: `${listIcon()}`,
    title: '',
    value: 'list',
  },
  {
    image: `${globeIcon()}`,
    title: '',
    value: 'globe',
  },
]

export const ProjectPage = ({ project }) => {
  const [viewType, setViewType] = useState(viewsList[0])
  const [filterViewInit, setFilterViewInit] = useState(filtersList[0])
  const [, setFilterView] = useGlobalState('projectsFilter', projectsOptions.startFilterView)
  const [user] = useGlobalState('user')
  const [currentProjects] = useProjects()

  const markers = currentProjects?.map((marker) => {
    return {
      id: marker._id,
      coordinates: [marker.location.geoPointLocation?.lat, marker.location.geoPointLocation?.lng],
      value: marker.served,
      title: marker.title,
      indexNumber: marker.indexNumber,
      flag: `${getImageUrl(marker.location.countryFlag?.asset?._ref)}`,
      partner: marker.partner.name,
      project: marker.category.title,
      peopleServed: marker.served,
      color: marker.markerColor.hex,
      slug: marker.slug.current,
    }
  })

  const projectsKeysMap = user?.sanityUser?.projects?.map(({ _key }) => _key)
  const projectsKeys = JSON.stringify(projectsKeysMap)
  useEffect(() => {
    switch (filterViewInit.value) {
      case 'all':
        setFilterView('')
        break
      case 'personal':
        setFilterView(` && _rev in ${projectsKeys}`)
        break
      case 'current':
        setFilterView(' && activityStatus == true')
        break
      default:
        setFilterView('')
    }
  }, [filterViewInit])

  return (
    <>
      <div className={`${styles.wrapper} container pt-5x`}>
        <div className="order mb-7x flex align-center" style={{ justifyContent: 'flex-end' }}>
          <div className="mr-1x w-100" style={{ maxWidth: '11rem' }}>
            <Dropdown items={filtersList} selected={filterViewInit} handler={setFilterViewInit} />
          </div>
          <div className="mr-1x w-100" style={{ maxWidth: '4rem' }}>
            <Dropdown items={viewsList} selected={viewType} handler={setViewType} />
          </div>
        </div>
        {viewType.value === 'list' ? (
          <ListProject project={project} />
        ) : (
          <GlobeProject project={project} markers={markers} />
        )}
      </div>
    </>
  )
}
