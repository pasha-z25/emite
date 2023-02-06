import { CAMERA_FAR_RADIUS_SCALE, RADIUS } from './enums'
import { PerspectiveCamera } from 'three'
import { coordinatesToPosition } from './utils'
import * as TWEEN from 'tween'

class Camera {
  perspectiveCamera

  constructor() {
    this.perspectiveCamera = new PerspectiveCamera()

    this.perspectiveCamera.name = 'camera'
    this.perspectiveCamera.far = RADIUS * CAMERA_FAR_RADIUS_SCALE
    this.perspectiveCamera.fov = 45
    this.perspectiveCamera.near = 1
  }

  initPosition(positions) {
    const [x, y, z] = coordinatesToPosition(positions, RADIUS * 3)
    this.perspectiveCamera.position.set(x, y, z)
  }

  setPosition(positions) {
    const [x, y, z] = coordinatesToPosition(positions, RADIUS * 3)

    const cameraPosition = this.perspectiveCamera.position
    const distance = Math.sqrt(
      Math.pow(x - cameraPosition.x, 2) +
        Math.pow(y - cameraPosition.y, 2) +
        Math.pow(z - cameraPosition.z, 2)
    )
    const scaleValue = 1 + distance / 4000

    const middle = {
      x: ((cameraPosition.x + x) / 2) * scaleValue,
      y: ((cameraPosition.y + y) / 2) * scaleValue,
      z: ((cameraPosition.z + z) / 2) * scaleValue,
    }

    new TWEEN.Tween(this.perspectiveCamera.position)
      .to(middle, 350)
      .easing(TWEEN.Easing.Sinusoidal.In)
      .onComplete(() => {
        new TWEEN.Tween(this.perspectiveCamera.position)
          .to({ x, y, z }, 350)
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .start()
      })
      .start()
  }
}

export default Camera
