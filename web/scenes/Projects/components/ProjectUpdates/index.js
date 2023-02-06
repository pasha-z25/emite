import { useGlobalState } from '~/utils/state'
import { showNotification } from '~/scenes/Notifications/components/helpers'

export const ProjectUpdates = ({ project, updates }) => {
  const [user] = useGlobalState('user')

  return updates?.length >= 1 ? (
    <>
      {updates?.map((update) => {
        return (update.subscribeStatus &&
          user?.sanityUser.projects?.some(({ _key }) => _key === project._id)) ||
          !update.subscribeStatus
          ? showNotification(update, project.amountRaised)
          : null
      })}
    </>
  ) : (
    <h4 className="weight-800 color-darkgray text-center">The project does not have updates</h4>
  )
}
