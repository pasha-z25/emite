import { useState } from 'react'
import SVG from '~/components/SVG'
import { Color } from '~/utils/constants'
import { useGlobalState } from '~/utils/state'
import {
  checkIcon,
  chevronRight,
  dataIcon,
  mediaIcon,
  moneyBagIcon,
  updateIcon,
} from '~/utils/svgImages'
import { fetchSvgParser, getImageUrl, getSubstringOfLength, resolvePromise } from '~/utils/helpers'
import { ProjectGallery } from '~/scenes/Projects/components/ProjectGallery'
import { ProjectData } from '~/scenes/Projects/components/ProjectData'
import { ProjectUpdates } from '~/scenes/Projects/components/ProjectUpdates'
import { ProjectContent } from '~/scenes/Projects/components/ProjectContent'
import Globe from '../Globe'

import styles from './style.module.scss'

export const GlobeProject = ({ project, markers }) => {
  const [activeTab, setActiveTab] = useState('media')
  const [, setModalOpened] = useGlobalState('contentPopup', false)
  const partnerIcon = resolvePromise(
    fetchSvgParser(`${getImageUrl(project.partner.image?.asset?._ref)}`).then((svg) => svg),
    [],
    [project]
  )
  const categoryIcon = resolvePromise(
    fetchSvgParser(`${getImageUrl(project.category.image?.asset?._ref)}`).then((svg) => svg),
    [],
    [project]
  )
  const locationIcon = resolvePromise(
    fetchSvgParser(`${getImageUrl(project.location.countryImage?.asset?._ref)}`).then((svg) => svg),
    [],
    [project]
  )
  const currentTab = (activeTab) => {
    switch (activeTab) {
      case 'media':
        return <ProjectGallery media={project.media} view="globe" />
      case 'data':
        return <ProjectData />
      case 'updates':
        return <ProjectUpdates />
      default:
        return <ProjectGallery media={project.media} />
    }
  }

  return (
    <>
      <div className={`${styles.globeProject} ${styles.projectStyles} flex-1`}>
        <div className="first-content flex flex-wrap mb-9x">
          <div className="text-wrapper w-100 my-auto pr-4x_lg">
            <h3 className="project-title weight-800 color-darkgray mb-4x">
              Project {project.indexNumber}: {project.title}
            </h3>
            <p className="description mb-5x">
              {getSubstringOfLength(project.description, 270)}{' '}
              <span className="bold pointer arrow-link red" onClick={() => setModalOpened(true)}>
                Read more
                <SVG content={chevronRight(Color.Red)} />
              </span>
            </p>
            {project.activityStatus ? (
              <button className="btn full-red" style={{ minWidth: '14.5rem' }}>
                Give to this project
              </button>
            ) : (
              <button className="btn full-green" style={{ pointerEvents: 'none' }}>
                <SVG content={checkIcon(Color.White)} size={24} className="mr-3x" />
                <span className="mr-5x">Completed</span>
              </button>
            )}
            <ProjectContent project={project} />
          </div>
          <div className="globe-wrapper image-wrapper relative w-100 border-r20px">
            {markers && <Globe markers={markers} project={project} />}
          </div>
        </div>
        <div className="project-info flex align-center justify-between small-text pt-3x pb-3x mb-9x">
          <div className="info-item amount-item flex align-center justify-center">
            <SVG content={moneyBagIcon('#FBDA17')} size={32} className="mr-2x" />
            <div>
              <p>Amount raised</p>
              <p className="color-darkgray">
                <b>{project?.alreadyCollected}%</b> of ${project?.amountRaised}
              </p>
            </div>
          </div>
          {partnerIcon && (
            <div className="info-item partner-item flex align-center justify-center">
              <SVG content={partnerIcon.value} size={32} className="mr-2x" />
              <div>
                <p>Project partner</p>
                <p className="bold color-darkgray">{project?.partner.name}</p>
              </div>
            </div>
          )}
          {categoryIcon && (
            <div className="info-item category-item flex align-center justify-center">
              <SVG content={categoryIcon.value} size={32} className="mr-2x" />
              <div>
                <p>Project category</p>
                <p className="bold color-darkgray">{project?.category.title}</p>
              </div>
            </div>
          )}
          {locationIcon && (
            <div className="info-item location-item flex align-center justify-center">
              <SVG content={locationIcon.value} size={32} className="mr-2x" />
              <div>
                <p>Project location</p>
                <p className="bold color-darkgray">{project?.location.title}</p>
              </div>
            </div>
          )}
        </div>
        <div className="tabs-wrapper mb-9x mb-12x_md mb-15x_lg mb-18x_xl">
          <div className="tabs-list text-center mb-5x">
            <button
              className={`btn small tab-btn ${activeTab === 'media' ? 'active' : 'opacity-80'}`}
              onClick={() => setActiveTab('media')}
            >
              <SVG content={mediaIcon()} size={24} className="mr-1x" />
              Media
            </button>
            {/*
            <button
              className={`btn small tab-btn ml-3x ${
                activeTab === 'data' ? 'active' : 'opacity-80'
              }`}
              onClick={() => setActiveTab('data')}
            >
              <SVG content={dataIcon()} size={24} className="mr-1x" />
              Data
            </button>
              */}
            <button
              className={`btn small tab-btn ml-3x ${
                activeTab === 'updates' ? 'active' : 'opacity-80'
              }`}
              onClick={() => setActiveTab('updates')}
            >
              <SVG content={updateIcon()} size={24} className="mr-1x" />
              Updates
            </button>
          </div>
          {currentTab(activeTab)}
        </div>
      </div>
    </>
  )
}
