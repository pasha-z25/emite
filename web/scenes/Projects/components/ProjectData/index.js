import { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import ChangingProgressProvider from './ChangingProgressProvider'
import { getCurrencyValue, log } from '~/utils/helpers'
import { Progress, Color } from '~/utils/constants'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'

import 'react-circular-progressbar/dist/styles.css'

export const ProjectData = ({ project }) => {
  const textColor = Color.DarkGray
  const percentage = project.alreadyCollected
  const pathColor = ((percentage) => {
    if (percentage < Progress.low) {
      return Color.Red
    } else if (percentage >= Progress.low && percentage < Progress.medium) {
      return Color.Yellow
    } else if (percentage >= Progress.medium) {
      return Color.Green
    } else {
      return Color.DarkGray
    }
  })(project.alreadyCollected)

  // const QUERY = groq`
  //   *[_type in ["mission", "mediaGallery"]] {
  //     _id,
  //     _type,
  //     title,
  //     media,
  //   }
  // `
  // // const QUERY = groq`
  // //   *[_type in ["mission", "mediaGallery"]].media [0...3] | order(date asc)
  // // `
  // // const QUERY = groq`
  // //   *[_type in ["mission", "mediaGallery"] && length(media) > 0].media
  // // `
  // useEffect(async () => {
  //   // const result = (await getClient().fetch(QUERY)).flat() //.filter((item) => item.date)
  //   const result = await getClient().fetch(QUERY)
  //   log('result', result)
  // }, [])

  return (
    <>
      <h4 className="weight-800 color-darkgray text-center">Project data tab</h4>
      <p>Amount raised {getCurrencyValue(project.amountRaised)}</p>
      <div className="ml-auto" style={{ maxWidth: '250px' }}>
        <ChangingProgressProvider values={[percentage]}>
          {(percentage) => (
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                pathTransitionDuration: 1.5,
                pathTransition: 'stroke-dashoffset 3s ease 0s',
                textColor,
                pathColor,
              })}
            />
          )}
        </ChangingProgressProvider>
      </div>
    </>
  )
}
