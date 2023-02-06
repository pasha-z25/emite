import { NotificationActionButton } from '~/components/atomic_elements/Buttons'

export const ShortNotification = ({ notification }) => {
  return (
    <>
      <div className="flex align-center justify-between">
        <p className="bold flex-1 pr-4x">{notification.content}</p>
        {notification.link && <NotificationActionButton notification={notification} />}
      </div>
    </>
  )
}
