const logoList = [
  {
    name: 'For Africa',
    src: '/images/partnersLogo/legs4africa.svg',
  },
  {
    name: 'SUB SAHARAN - education project',
    src: '/images/partnersLogo/SUB-Saharan.svg',
  },
  // {
  //   name: 'Resources for the BLIND',
  //   src: '/images/partnersLogo/BLIND.svg',
  // },
  {
    name: 'Impact Africa',
    src: '/images/partnersLogo/Impact-Africa.svg',
  },
  {
    name: 'CMS school',
    src: '/images/partnersLogo/CMS-school.svg',
  },
  {
    name: 'BMDMI - more than medicine',
    src: '/images/partnersLogo/BMDMI.svg',
  },
  {
    name: 'HOPE for life',
    src: '/images/partnersLogo/HOPE-for-life.svg',
  },
  {
    name: 'LifeWater',
    src: '/images/partnersLogo/LWR-Lifewater.svg',
  },
  {
    name: 'Resources for the BLIND',
    src: '/images/partnersLogo/Resources-for-the-Blind.svg',
  },
  {
    name: 'HOPE international',
    src: '/images/partnersLogo/HOPE-international.svg',
  },
  {
    name: 'TMC Indonesia',
    src: '/images/partnersLogo/TMC-Indonesia.svg',
  },
  {
    name: 'Days for girls',
    src: '/images/partnersLogo/Days-For-Girls.svg',
  },
  {
    name: 'Sole Hope',
    src: '/images/partnersLogo/Sole-Hope.svg',
  },
  {
    name: 'Uganda',
    src: '/images/partnersLogo/Uganda.svg',
  },
  {
    name: 'Hands up for Haiti',
    src: '/images/partnersLogo/Hands-up-for-Haiti.svg',
  },
]
export const Logos = () => {
  return (
    <>
      {logoList.map((image, index) => {
        return <img key={index} src={image.src} alt={image.name} style={{ marginBottom: '3rem' }} />
      })}
    </>
  )
}
