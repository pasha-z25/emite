import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { debounce } from '@fluss/core'
import { whenBrowser } from '~/utils/helpers'
import { useProjects } from '~/scenes/Projects/components/helpers'

import styles from './style.module.scss'

export const ProjectsList = () => {
  const router = useRouter()
  const [currentProjects] = useProjects()
  const [projectsList, setProjectsList] = useState([])
  useEffect(() => setProjectsList(currentProjects || []), [currentProjects])
  const intervalFunction = debounce((value) => {
    const filtered = currentProjects.filter(({ indexNumber, title }) => {
      return (
        indexNumber.toString().includes(value) || title.toLowerCase().includes(value.toLowerCase())
      )
    })
    setProjectsList(value ? filtered : currentProjects)
  }, 30)
  const filterHandler = (value) => {
    whenBrowser(() => intervalFunction(value))
  }

  return (
    <div className={`${styles.wrapper} w-100`}>
      <div className="list-wrap">
        <form className={`${styles.form} mb-2x`}>
          <label className="small-text w-100 relative">
            <input
              type="text"
              className="input w-100"
              placeholder="№ or Project name"
              onChange={(e) => filterHandler(e.target.value)}
            />
            <button className="reset transition" type="reset" onClick={() => filterHandler('')}>
              &times;
            </button>
          </label>
        </form>
        <div className={styles.listWrapper}>
          {projectsList.length === 0 ? (
            <p className="small-text bold color-darkgray">No projects in this category</p>
          ) : (
            <ul className={`${styles.list} list-none`}>
              {projectsList.map((project) => {
                return (
                  <li key={project._id} className="item mb-3x bold">
                    <Link href={`/projects/${project.slug.current}`}>
                      <a
                        className={`${
                          router.query.slug === project.slug.current ? 'active color-darkgray ' : ''
                        }link relative`}
                      >
                        #{project.indexNumber} {project.title}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
