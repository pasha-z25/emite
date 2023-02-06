import { handleMutations, log } from '~/utils/helpers'
import { notificationStatuses } from '~/utils/constants'

export const Notification = ({ user, auth0User }) => {
  const changeSettingsHandler = (value, notificationType) => {
    const expression = `notificationsOptions.${notificationType}`
    const NotificationSettingsQuery = [
      {
        patch: {
          id: auth0User.sub.replace('|', '-'),
          set: {
            [expression]: value,
          },
        },
      },
    ]

    handleMutations(NotificationSettingsQuery)

    log('changeSettingsHandler value:', value)
  }
  return (
    <div className="content-wrapper mw-50rem mx-auto">
      <div className="settings-item pt-4x pb-4x flex justify-between">
        <div className="content flex-1">
          <h4 className="h4 title color-darkgray bold mb-2x">Email</h4>
          <p className="description">
            You need to collect $ 10,000. Learn more about the project and give it your love
          </p>
        </div>
        <div className="option">
          <label className="customCheckbox">
            <input
              defaultChecked={user.notificationsOptions.emailStatus}
              type="checkbox"
              className="checkbox hidden"
              onChange={(e) =>
                changeSettingsHandler(e.target.checked, notificationStatuses.EMAIL_STATUS)
              }
            />
            <span className="checkboxView" />
          </label>
        </div>
      </div>
      <hr className="light" />
      <div className="settings-item pt-4x pb-4x flex justify-between">
        <div className="content flex-1">
          <h4 className="h4 title color-darkgray bold mb-2x">Text</h4>
          <p className="description">
            You need to collect $ 10,000. Learn more about the project and give it your love
          </p>
        </div>
        <div className="option">
          <label className="customCheckbox">
            <input
              defaultChecked={user.notificationsOptions.textSmsStatus}
              type="checkbox"
              className="checkbox hidden"
              onChange={(e) =>
                changeSettingsHandler(e.target.checked, notificationStatuses.TEXT_SMS_STATUS)
              }
            />
            <span className="checkboxView" />
          </label>
        </div>
      </div>
      <hr className="light" />
      <div className="settings-item pt-4x pb-4x flex justify-between">
        <div className="content flex-1">
          <h4 className="h4 title color-darkgray bold mb-2x">Marketing</h4>
          <p className="description">
            You need to collect $ 10,000. Learn more about the project and give it your love
          </p>
        </div>
        <div className="option">
          <label className="customCheckbox">
            <input
              defaultChecked={user.notificationsOptions.marketingStatus}
              type="checkbox"
              className="checkbox hidden"
              onChange={(e) =>
                changeSettingsHandler(e.target.checked, notificationStatuses.MARKETING_STATUS)
              }
            />
            <span className="checkboxView" />
          </label>
        </div>
      </div>
      <hr className="light" />
      <div className="settings-item pt-4x pb-4x flex justify-between">
        <div className="content flex-1">
          <h4 className="h4 title color-darkgray bold mb-2x">Transaction</h4>
          <p className="description">
            You need to collect $ 10,000. Learn more about the project and give it your love
          </p>
        </div>
        <div className="option">
          <label className="customCheckbox">
            <input
              defaultChecked={user.notificationsOptions.transactionStatus}
              type="checkbox"
              className="checkbox hidden"
              onChange={(e) =>
                changeSettingsHandler(e.target.checked, notificationStatuses.TRANSACTIONS_STATUS)
              }
            />
            <span className="checkboxView" />
          </label>
        </div>
      </div>
      <hr className="light" />
      <div className="settings-item pt-4x pb-4x flex justify-between">
        <div className="content flex-1">
          <h4 className="h4 title color-darkgray bold mb-2x">Project update</h4>
          <p className="description">
            You need to collect $ 10,000. Learn more about the project and give it your love
          </p>
        </div>
        <div className="option">
          <label className="customCheckbox">
            <input
              defaultChecked={user.notificationsOptions.projectUpdatesStatus}
              type="checkbox"
              className="checkbox hidden"
              onChange={(e) =>
                changeSettingsHandler(e.target.checked, notificationStatuses.PROJECT_UPDATES_STATUS)
              }
            />
            <span className="checkboxView" />
          </label>
        </div>
      </div>
      <hr className="light" />
      <div className="settings-item pt-4x pb-4x flex justify-between">
        <div className="content flex-1">
          <h4 className="h4 title color-darkgray bold mb-2x">New project</h4>
          <p className="description">
            You need to collect $ 10,000. Learn more about the project and give it your love
          </p>
        </div>
        <div className="option">
          <label className="customCheckbox">
            <input
              defaultChecked={user.notificationsOptions.newProjectStatus}
              type="checkbox"
              className="checkbox hidden"
              onChange={(e) =>
                changeSettingsHandler(e.target.checked, notificationStatuses.NEW_PROJECT_STATUS)
              }
            />
            <span className="checkboxView" />
          </label>
        </div>
      </div>
    </div>
  )
}
