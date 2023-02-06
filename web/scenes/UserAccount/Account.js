import { useState } from 'react'
import { General } from './components/General'
import { Payment } from './components/Payment'
import { Transaction } from './components/Transaction'
import { Notification } from './components/Notification'

export const Account = ({ user }) => {
  const [activeTab, setActiveTab] = useState('general')

  const currentTab = (activeTab) => {
    switch (activeTab) {
      case 'general':
        return <General user={user?.sanityUser} auth0User={user?.auth0User} />
      case 'payment':
        return <Payment user={user?.sanityUser} auth0User={user?.auth0User} />
      case 'transaction':
        return <Transaction user={user?.sanityUser} auth0User={user?.auth0User} />
      case 'notification':
        return <Notification user={user?.sanityUser} auth0User={user?.auth0User} />
      default:
        return <General user={user?.sanityUser} auth0User={user?.auth0User} />
    }
  }

  return (
    <>
      <div className="container pt-10x pb-9x">
        <div className="tabs-wrapper">
          <div className="tabs-list text-center mb-5x">
            <button
              className={`btn small tab-btn color-darkgray ${
                activeTab === 'general' ? 'active' : 'opacity-80'
              }`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={`btn small tab-btn color-darkgray ml-1x ml-3x_lg ${
                activeTab === 'payment' ? 'active' : 'opacity-80'
              }`}
              onClick={() => setActiveTab('payment')}
            >
              Payment
            </button>
            <button
              className={`btn small tab-btn color-darkgray ml-1x ml-3x_lg ${
                activeTab === 'transaction' ? 'active' : 'opacity-80'
              }`}
              onClick={() => setActiveTab('transaction')}
            >
              Transaction
            </button>
            <button
              className={`btn small tab-btn color-darkgray ml-1x ml-3x_lg ${
                activeTab === 'notification' ? 'active' : 'opacity-80'
              }`}
              onClick={() => setActiveTab('notification')}
            >
              Notification
            </button>
          </div>
          {currentTab(activeTab)}
        </div>
      </div>
    </>
  )
}
