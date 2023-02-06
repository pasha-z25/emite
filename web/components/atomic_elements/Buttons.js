import Link from 'next/link'
import { Color } from '~/utils/constants'

export const NotificationActionButton = ({
  notification,
  classList,
  popupNotification = false,
}) => {
  return (
    <>
      {notification.link.includes('http') ? (
        <a
          href={notification.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn color-white multicolor ${classList}`}
          style={{
            backgroundColor: !notification.important
              ? notification.color ?? Color.Red
              : popupNotification
              ? Color.Red
              : Color.White,
          }}
        >
          Call to action
        </a>
      ) : (
        <Link href={notification.link}>
          <a
            className={`btn color-white multicolor ${classList}`}
            style={{
              backgroundColor: !notification.important
                ? notification.color ?? Color.Red
                : popupNotification
                ? Color.Red
                : Color.White,
            }}
          >
            Call to action
          </a>
        </Link>
      )}
    </>
  )
}
