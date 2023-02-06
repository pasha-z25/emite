import MiteGlobe from '~/components/sections/Globe'
import Tooltip from '~/scenes/Projects/components/Globe/tooltip'

const globe = ({ markers, project }) => {
  return markers && <MiteGlobe project={project} markers={markers} Tooltip={Tooltip} />
}

export default globe
