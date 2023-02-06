import { RADIUS } from './enums'
import { DirectionalLight, Group } from 'three'

const { PointLight, AmbientLight } = require('three')

class Light {
  dLightGroup
  ambientLight

  constructor() {
    this.dLightGroup = new Group()

    let dLight = new DirectionalLight(0xffffff, 0.2)
    dLight.position.set(-2400, 6000, -1200)
    this.dLightGroup.add(dLight)

    let dLight1 = new DirectionalLight(0x7982f6, 0.3)
    dLight1.position.set(-600, 1500, 600)
    this.dLightGroup.add(dLight1)

    let dLight2 = new PointLight(0x8566cc, 0.2)
    dLight2.position.set(-600, 1500, 600)
    this.dLightGroup.add(dLight2)

    this.ambientLight = new AmbientLight(0xbbbbbb, 0.2)
    this.ambientLight = this.createAmbientLight()
  }

  createPointLight([x, y, z]) {
    const COLOR = 'white'
    const INTENSITY = 0.22
    const pointLight = new PointLight(COLOR, INTENSITY)
    pointLight.position.set(RADIUS * x, RADIUS * y, RADIUS * z)

    return pointLight
  }

  getLightGroup() {
    return this.dLightGroup
  }

  createAmbientLight() {
    const COLOR = 'white'
    const INTENSITY = 1
    return new AmbientLight(COLOR, INTENSITY)
  }

  getAmbientLight() {
    return this.ambientLight
  }
}

export default Light
