import { Raycaster, Scene, Vector3, WebGLRenderer } from 'three'
import Camera from './camera'
import Earth from './earth'
import Light from './light'
import DefaultSettings from './defaultSettings'
import GlobeControls from './GlobeControls'
import Marker from './Marker'
import { convertVector3ToVector2, getMouse } from './utils'
import * as TWEEN from 'tween'

import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

class GlobeController {
  scene
  camera
  renderer
  earth
  lights
  orbitControls
  animationFrame
  raycaster
  outlinePass
  markers
  focus
  composer
  componentContainer
  markersList
  activeMarker
  defaultMarkerId
  callbacks

  mouseDownAction
  mouseDownOutsideAction
  mouseMoveOutsideAction
  mouseMoveAction
  mouseUpAction
  isAuth = false

  constructor({ components, markers = [], defaultMarkerId, callbacks, isAuth }) {
    this.initRenderer(components.canvas)
    this.initCamera(markers, defaultMarkerId)
    this.initOrbitControls()
    this.componentContainer = components.container
    this.isAuth = isAuth
    this.callbacks = callbacks
    this.defaultMarkerId = defaultMarkerId

    this.scene = new Scene()
    this.earth = new Earth()
    this.lights = new Light()
    this.raycaster = new Raycaster()
    this.markers = markers
    this.markersList = []

    this.scene.add(this.camera.perspectiveCamera)
    this.scene.add(this.earth.getEarth())
    this.scene.add(this.lights.getAmbientLight())

    this.camera.perspectiveCamera.add(this.earth.getGlowBackground())

    this.initPostprocessing(components.container)
    this.updateMarkers(markers, defaultMarkerId)
    this.focus = 0

    this.resize(components.container)
    this.animate()

    this.mouseUpAction = (e) => this.onMouseUp.call(this, e, components.canvas)
    this.mouseDownAction = (e) => this.onMouseDown.call(this, e, components.canvas)
    this.mouseMoveAction = (e) => this.onMouseMove.call(this, e, components.canvas)
    this.mouseDownOutsideAction = (e) => this.onMouseDownOutside.call(this, e, components.canvas)
    this.mouseMoveOutsideAction = (e) => this.onMouseMoveOutside.call(this, e, components.canvas)

    if ('window' in globalThis)
      window.addEventListener('resize', () => this.resize(components.container))

    if ('window' in globalThis && 'ontouchstart' in window) {
      components.container.addEventListener('touchstart', this.mouseDownAction)
      components.container.addEventListener('touchend', this.mouseUpAction)
      components.container.addEventListener('touchmove', this.mouseMoveAction)
      if ('window' in globalThis) window.addEventListener('touchend', this.mouseDownOutsideAction)
    } else {
      components.container.addEventListener('mouseup', this.mouseUpAction)
      components.container.addEventListener('mousedown', this.mouseDownAction)
      components.container.addEventListener('mousemove', this.mouseMoveAction)
      if ('window' in globalThis) {
        window.addEventListener('click', this.mouseDownOutsideAction)
        window.addEventListener('mousemove', this.mouseMoveOutsideAction)
      }
    }
  }

  animate() {
    this.render()
    TWEEN.update()
    this.animationFrame = requestAnimationFrame(this.animate.bind(this))
  }

  initCamera(markers, defaultMarkerId) {
    this.camera = new Camera()
    let cameraPosition = DefaultSettings.cameraPosition

    if (markers.length && markers[0].coordinates) {
      const marker = markers.find((marker) => marker.id === defaultMarkerId)
      cameraPosition = marker?.coordinates ?? markers[0].coordinates
    }

    this.camera.initPosition(cameraPosition)
  }

  initRenderer(canvas) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas,
    })
  }

  initPostprocessing({ clientWidth, clientHeight }) {
    this.composer = new EffectComposer(this.renderer)
    this.composer.setSize(clientWidth, clientHeight)
    this.composer.setPixelRatio(1)

    const taaRenderPass = new TAARenderPass(this.scene, this.camera.perspectiveCamera)
    taaRenderPass.unbiased = true
    taaRenderPass.sampleLevel = 2

    this.composer.addPass(taaRenderPass)
  }

  initOrbitControls() {
    const orbitControls = new GlobeControls(this.camera.perspectiveCamera, this.renderer.domElement)
    this.orbitControls = orbitControls.getControls()
  }

  updateMarkers(markers, defaultMarkerId) {
    this.defaultMarkerId = defaultMarkerId

    this.markersList.forEach((item) => {
      this.scene.remove(item.marker)
      this.scene.remove(item.visibleMarker)
    })
    this.markersList = []

    if (!markers.length) return
    markers.forEach((markerProps) => {
      if (markerProps?.id && markerProps.coordinates) {
        const markerObj = new Marker(markerProps, this.componentContainer.clientWidth)
        this.markersList.push(markerObj)
        this.scene.add(markerObj.marker)
        this.scene.add(markerObj.visibleMarker)
        markerObj.visibleMarker.lookAt(new Vector3(0, 0, 0))
        markerObj.marker.lookAt(new Vector3(0, 0, 0))

        if (markerProps?.id === defaultMarkerId) {
          this.activeMarker = markerObj
          this.activeMarker.addGlow()
        }
      }
    })
  }

  changeMarkersSize(clientWidth) {
    this.markersList.forEach((marker) => {
      marker.changeMarkerSize(clientWidth)
    })
  }

  render() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera)
    this.orbitControls.update()
    this.earth.animateClouds()
    this.composer.render()
  }

  raycast(event, canvas) {
    const mouse = getMouse(event, canvas)
    this.raycaster.setFromCamera(mouse, this.camera.perspectiveCamera)

    return this.raycaster.intersectObjects(this.scene.children)
  }

  onMouseUp(event, canvas) {
    if (this.componentContainer.querySelector('.details')?.contains(event.target)) return
    event.preventDefault()
    const intersects = this.raycast(event, canvas)
    if (intersects.length) {
      const mesh = intersects[0]?.object
      if (mesh.name === 'marker' && (this.isAuth || 'ontouchstart' in window)) {
        this.markersList.forEach((markerOptions) => {
          if (markerOptions.marker.uuid === mesh.uuid) {
            if (this.isAuth) {
              if (this.activeMarker) {
                this.activeMarker.removeGlow()
                this.activeMarker.defaultGlow()
              }
              this.activeMarker = markerOptions
              this.activeMarker.addGlow()
              this.orbitControls.autoRotate = true
            } else {
              this.orbitControls.autoRotate = false
            }

            this.markers.forEach((marker) => {
              if (marker.id === mesh.uuid) {
                if (!this.isAuth && 'ontouchstart' in window) {
                  const point = { x: canvas.width / 2, y: canvas.height / 2 }
                  this.callbacks.onFocus(mesh.uuid, point)
                  this.focus = mesh.uuid

                  if (this.activeMarker) {
                    this.activeMarker.defaultGlow()
                  }
                  this.activeMarker = markerOptions
                  this.activeMarker.removeGlow()
                  this.camera.setPosition(marker.coordinates)
                } else if (this.isAuth) {
                  this.callbacks.fetchProject(marker.slug)
                  this.camera.setPosition(marker.coordinates)
                }
              }
            })
          }
        })
      }
    } else if (this.focus) {
      this.orbitControls.autoRotate = true
      this.callbacks.onDefocus()
    }
  }

  onMouseDown(event, canvas) {
    if (this.componentContainer.querySelector('.details')?.contains(event.target)) return
    event.preventDefault()

    const intersects = this.raycast(event, canvas)
    if (intersects.length) {
      const mesh = intersects[0]?.object
      if ((mesh.name === 'earth' || mesh.name === 'marker') && this.focus) {
        this.orbitControls.autoRotate = true
        this.callbacks.onDefocus()
        this.activeMarker.defaultGlow()
      }
    }
  }

  onMouseMove(event, canvas) {
    event.preventDefault()
    const intersects = this.raycast(event, canvas)
    if (
      intersects.length &&
      !this.componentContainer.querySelector('.details')?.contains(event.target)
    ) {
      const mesh = intersects[0]?.object

      if (mesh.name === 'earth') {
        document.body.style.cursor = 'grab'

        if (this.focus) {
          this.hideTooltip()
          if (this.activeMarker && !this.isAuth) {
            this.activeMarker.defaultGlow()
          } else if (this.activeMarker.marker.uuid !== this.defaultMarkerId) {
            console.log(this.defaultMarkerId)
            this.activeMarker.defaultGlow()
          } else this.activeMarker.addGlow()
        }
      } else if (mesh.name === 'marker') {
        document.body.style.cursor = 'pointer'

        if (!this.focus || this.focus !== mesh?.uuid) {
          const point = convertVector3ToVector2(
            mesh.position,
            canvas,
            this.camera.perspectiveCamera
          )

          const onHoverCallback = () => {
            let marker = this.markers.find((marker) => marker.id === mesh?.uuid)
            this.camera.setPosition(marker.coordinates)
            if (this.activeMarker) {
              this.activeMarker.defaultGlow()
            }

            this.activeMarker.addGlow()
          }

          this.callbacks.onHover(mesh?.uuid, point, onHoverCallback)
        }

        this.markersList.forEach((markerOptions) => {
          if (markerOptions.marker.uuid === mesh.uuid) {
            this.orbitControls.autoRotate = false
            this.focus = mesh?.uuid
            if (this.activeMarker) {
              if (this.activeMarker.marker.uuid !== this.defaultMarkerId)
                this.activeMarker.defaultGlow()
              else this.activeMarker.addGlow()
            }
            this.activeMarker = markerOptions
            this.activeMarker.removeGlow()
          }
        })
      }
    } else document.body.style.cursor = 'default'
  }

  onMouseDownOutside(event, canvas) {
    if (!this.componentContainer.contains(event.target)) {
      this.orbitControls.autoRotate = true
      this.callbacks.onDefocus()
    }
  }

  onMouseMoveOutside(event, canvas) {
    event.preventDefault()
    const intersects = this.raycast(event, canvas)
    const isTooltipOpen = this.componentContainer.querySelector('.details')?.contains(event.target)
    if (!intersects.length && !isTooltipOpen) {
      if (!this.isAuth && this.focus) {
        this.hideTooltip()
      }
    }
  }

  hideTooltip() {
    this.focus = 0
    this.orbitControls.autoRotate = true
    this.callbacks.onDefocus()
  }

  resize({ clientWidth, clientHeight }) {
    let ratio = clientHeight / clientWidth
    ratio = ratio > 1 ? ratio : 1
    this.renderer.setSize(clientWidth, clientHeight / ratio)
    this.camera.perspectiveCamera.aspect = clientWidth / (clientHeight / ratio)
    this.camera.perspectiveCamera.updateProjectionMatrix()
    this.composer.setSize(clientWidth, clientHeight / ratio)
    this.changeMarkersSize(clientWidth)
    this.render()

    if (!this.isAuth && this.focus) {
      this.hideTooltip()
    }
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame)
    this.renderer.domElement.remove()

    if (typeof window && 'ontouchstart' in window) {
      this.componentContainer.removeEventListener('touchstart', this.mouseMoveAction)
      this.componentContainer.removeEventListener('touchEnd', this.mouseUpAction)
      this.componentContainer.removeEventListener('touchmove', this.mouseDownAction)
      if ('window' in globalThis)
        window.removeEventListener('touchend', this.mouseDownOutsideAction)
    } else {
      this.componentContainer.removeEventListener('mousemove', this.mouseMoveAction)
      this.componentContainer.removeEventListener('mouseup', this.mouseUpAction)
      this.componentContainer.removeEventListener('mousedown', this.mouseDownAction)
      if ('window' in globalThis) {
        window.removeEventListener('click', this.mouseDownOutsideAction)
        window.removeEventListener('mousemove', this.mouseMoveOutsideAction)
      }
    }
  }
}

export default GlobeController
