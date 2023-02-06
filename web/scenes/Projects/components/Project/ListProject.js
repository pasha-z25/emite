import { useEffect, useState } from 'react'
import Image from 'next/image'
import useResize from 'use-resizing'
import SVG from '~/components/SVG'
import { moneyBagIcon, mediaIcon, updateIcon, checkIcon, chevronRight } from '~/utils/svgImages'
import { Color, notificationTypes } from '~/utils/constants'
import { useGlobalState } from '~/utils/state'
import { getImageUrl, getSubstringOfLength, resolvePromise, fetchSvgParser } from '~/utils/helpers'
import { ProjectsList } from '~/scenes/Projects/components/ProjectsList'
import { ProjectGallery } from '~/scenes/Projects/components/ProjectGallery'
import { ProjectData } from '~/scenes/Projects/components/ProjectData'
import { ProjectUpdates } from '~/scenes/Projects/components/ProjectUpdates'
import { projectSubscribeHandler } from '../helpers'
import { ProjectContent } from '~/scenes/Projects/components/ProjectContent'

import styles from './style.module.scss'
import { FirebaseServices } from '~/utils/firebase'

export const ListProject = ({ project }) => {
  const [user] = useGlobalState('user')
  const [activeTab, setActiveTab] = useState('media')
  const [, setModalOpened] = useGlobalState('contentPopup', false)
  const [updates, setUpdate] = useState(project.updates ?? [])

  useEffect(() => {
    const firebase = FirebaseServices.instance
    const projectUpdatesNotifications = (notification) => {
      if (notification.type === notificationTypes.PROJECT_UPDATES) {
        setUpdate((prevState) => [notification.data, ...prevState])
      }
    }
    firebase.subscribeOnMessage('PROJECT_UPDATES_NOTIFICATION', projectUpdatesNotifications)

    return () => firebase.unsubscribe('PROJECT_UPDATES_NOTIFICATION')
  }, [])

  useEffect(() => {
    setUpdate(project.updates ?? [])
  }, [project.updates])

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
        return <ProjectGallery media={project.media} />
      case 'data':
        return <ProjectData project={project} />
      case 'updates':
        return <ProjectUpdates project={project} updates={updates} />
      default:
        return <ProjectGallery media={project.media} />
    }
  }
  const screenSize = useResize()

  return (
    <>
      <div className="flex">
        {screenSize.width >= 1200 && <ProjectsList />}
        <div className={`${styles.listProject} ${styles.projectStyles} flex-1`}>
          <div className="first-content flex flex-wrap align-start mb-9x">
            <div className="main-image-wrapper relative block-square w-100 overflow-hidden border-r20px">
              <Image
                src={`${getImageUrl(project.mainImage.asset._ref).width(500).height(500)}`}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="text-wrapper">
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
                <button
                  className="btn full-red"
                  style={{ minWidth: '14.5rem' }}
                  onClick={() =>
                    projectSubscribeHandler(project, user?.sanityUser, user?.auth0User)
                  }
                >
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
          </div>
          <div className="project-info flex align-center justify-between small-text pt-3x pb-3x mb-9x">
            <div className="info-item amount-item">
              <SVG content={moneyBagIcon('#FBDA17')} size={32} />
              <p>Amount raised</p>
              <p className="color-darkgray">
                <b>{project?.alreadyCollected}%</b> of ${project?.amountRaised}
              </p>
            </div>
            {partnerIcon && (
              <div className="info-item partner-item">
                <SVG content={partnerIcon.value} size={32} />
                <p>Project partner</p>
                <p className="bold color-darkgray">{project?.partner.name}</p>
              </div>
            )}
            {categoryIcon && (
              <div className="info-item category-item">
                <SVG content={categoryIcon.value} size={32} />
                <p>Project category</p>
                <p className="bold color-darkgray">{project?.category.title}</p>
              </div>
            )}
            {locationIcon && (
              <div className="info-item location-item">
                <SVG content={locationIcon.value} size={32} />
                <p>Project location</p>
                <p className="bold color-darkgray">{project?.location.title}</p>
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
                className={`btn small tab-btn ml-1x ml-3x_lg ${
                  activeTab === 'data' ? 'active' : 'opacity-80'
                }`}
                onClick={() => setActiveTab('data')}
              >
                <SVG content={dataIcon()} size={24} className="mr-1x" />
                Data
              </button>
              */}
              <button
                className={`btn small tab-btn ml-1x ml-3x_lg ${
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
      </div>
    </>
  )
}
