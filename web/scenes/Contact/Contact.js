import { useState } from 'react'
import { useRouter } from 'next/router'
import { Dropdown } from '~/components/Dropdown'
import { PopUpWrapper } from '~/components/sections/PopUpWrapper'
import { FAQlist } from './components/FAQ'
import {
  DefaultForm,
  ReferForm,
  PartnerForm,
  HostPartyForm,
  SponsorForm,
  FundraiserForm,
  DonationsForm,
  SupportForm,
  InformationForm,
  OtherForm,
} from './components/forms'

import styles from './style.module.scss'
import categoryItems from './components/categoryItems.json'

export const Contact = () => {
  const router = useRouter()
  const pageCategory = router.query.category
  const currentCategory = categoryItems.find((item) => item.value === pageCategory)
  const [congratulationPopup, setCongratulationPopup] = useState(router.query.success === 'true')
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || categoryItems[0])

  const hidePopup = () => {
    router.push('/contact')
    setCongratulationPopup(false)
  }

  return (
    <>
      <div
        className={`${styles.wrapper} container flex flex-wrap justify-between pt-16x pt-20x_lg pb-12x pb-18x_lg`}
      >
        <div className="text-wrapper mb-9x mb-1x_xl">
          <h1 className="h1 relative max-content main-title color-darkgray mb-5x mb-7x_lg">
            Contact us
            <span className="color-red block relative">How can we help?</span>
          </h1>
          <div className="dropdown-wrapper">
            <Dropdown
              items={categoryItems}
              selected={selectedCategory}
              handler={setSelectedCategory}
            />
          </div>
          <div className="form-wrapper relative">
            {(() => {
              switch (selectedCategory.value) {
                case 'refer':
                  return <ReferForm />
                case 'partner':
                  return <PartnerForm />
                case 'hostParty':
                  return <HostPartyForm />
                case 'sponsor':
                  return <SponsorForm />
                case 'fundraiser':
                  return <FundraiserForm />
                case 'donations':
                  return <DonationsForm />
                case 'support':
                  return <SupportForm />
                case 'information':
                  return <InformationForm />
                case 'other':
                  return <OtherForm />
                default:
                  return <DefaultForm />
              }
            })()}
          </div>
        </div>
        <div className="list-wrapper">
          <h4 className="h4 bold color-darkgray mb-3x mb-4x_lg">
            Before you reach out, do these answer your question?
          </h4>
          <FAQlist />
        </div>
      </div>
      {congratulationPopup && (
        <PopUpWrapper handler={hidePopup}>
          <div className="text-center">
            <h3 className="title h3 weight-800 mb-1rem color-darkgray">Thank you!</h3>
            <p className="mx-auto" style={{ maxWidth: '19rem' }}>
              Someone from our team will be in touch with you soon.
            </p>
          </div>
        </PopUpWrapper>
      )}
    </>
  )
}
