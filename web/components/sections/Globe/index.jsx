import { useState, useRef, useEffect, useMemo } from 'react'
import GlobeController from './GlobeController'
import styles from './globe.module.scss'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

const Globe = ({ markers, Tooltip, project = null }) => {
  const [details, setDetails] = useState(null)
  const [controller, setController] = useState(null)
  const canvasWrapRef = useRef(null)
  const canvasRef = useRef(null)
  const { user } = useUser()
  const router = useRouter()

  let timeOutId = null
  const onFocus = (id, position) => {
    const [activeMarker] = markers.filter((marker) => marker.id === id)
    if (activeMarker) {
      setDetails(null)
      timeOutId = setTimeout(() => setDetails({ marker: activeMarker, position }), 700)
    }
  }

  const onHover = (id, position, centerCamera) => {
    const [activeMarker] = markers.filter((marker) => marker.id === id)
    if (activeMarker) {
      setDetails(null)
      timeOutId = setTimeout(
        () => setDetails({ marker: activeMarker, position, centerCamera }),
        250
      )
    }
  }

  const fetchProject = (slug) => {
    router.push(slug)
  }

  const onDefocus = () => {
    clearTimeout(timeOutId)
    setDetails(null)
  }

  useEffect(() => {
    const globeController = new GlobeController({
      components: {
        canvas: canvasRef.current,
        container: canvasWrapRef.current,
      },
      markers,
      defaultMarkerId: project?._id,
      callbacks: {
        onFocus,
        onDefocus,
        onHover,
        fetchProject,
      },
      isAuth: !!user,
    })
    setController(globeController)
    return () => {
      globeController.destroy()
      setController(null)
    }
  }, [])

  useEffect(() => {
    if (controller) {
      controller.updateMarkers(markers, project._id)
    }
  }, [markers, project])

  const globe = useMemo(() => <canvas ref={canvasRef} />, [])
  return (
    <div className={`${styles.wrapper} wrapper block-square`} ref={canvasWrapRef}>
      <div className={`${styles.globeWrapper} absolute-full`}>
        {details && <Tooltip props={details} callback={{ onDefocus }} />}
        {globe}
      </div>
    </div>
  )
}

export default Globe
