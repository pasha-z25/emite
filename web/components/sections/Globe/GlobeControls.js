import { RADIUS } from './enums'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class GlobeControls {
  controls

  constructor(camera, rendererDomElement) {
    this.controls = new OrbitControls(camera, rendererDomElement)
    this.controls.maxDistance = (RADIUS * 1000) / 10
    this.controls.minDistance = RADIUS * 1.1
    this.controls.rotateSpeed = 0.2
    this.controls.zoomSpeed = 1
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.4
    this.controls.dampingFactor = 0.1
    this.controls.enableDamping = true
    this.controls.enableZoom = false
    this.controls.maxPolarAngle = Math.PI
    this.controls.minPolarAngle = 0
    this.controls.enablePan = false
  }

  getControls() {
    return this.controls
  }
}

export default GlobeControls
