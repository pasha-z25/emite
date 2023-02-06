import MiteGlobe from '~/components/sections/Globe'
import { globeMarkers as Markers } from '~/utils/data'
import Tooltip from './tooltip'

const markers = Markers.map((marker) => ({
  id: marker._id,
  coordinates: [marker.location.latitude, marker.location.longitude],
  value: marker.peopleServed,
  indexNumber: marker.indexNumber,
  title: marker.title,
  flag: marker.flag,
  partner: marker.partner.name,
  project: marker.categories.title,
  peopleServed: marker.peopleServed,
  color: marker.color,
}))

const globe = () => {
  return <MiteGlobe markers={markers} Tooltip={Tooltip} />
}

export default globe
