import { CircleGeometry, DoubleSide, MeshBasicMaterial, MeshPhongMaterial } from 'three'

const { Mesh, SphereGeometry, MeshLambertMaterial, TextureLoader } = require('three')
const { createGlowMesh } = require('three-glow-mesh')
const { RADIUS } = require('./enums')

class Earth {
  GLOBE_SEGMENTS = 50
  CLOUDS_OFFSET = 1
  textureLoader
  earth
  clouds
  glow
  glowBackground

  constructor() {
    this.textureLoader = new TextureLoader()
    this.initEarth()
    this.initClouds()
    this.initGlow()

    this.earth.add(this.clouds)
    this.earth.add(this.glow)
  }

  initEarth() {
    this.earth = new Mesh()
    this.earth.geometry = new SphereGeometry(RADIUS, this.GLOBE_SEGMENTS, this.GLOBE_SEGMENTS)
    this.earth.name = 'earth'

    const globeTexture = this.textureLoader.load('/images/globe.jpg')
    this.earth.material = new MeshPhongMaterial({
      map: globeTexture,
    })
  }

  initClouds() {
    this.clouds = new Mesh()
    this.clouds.geometry = new SphereGeometry(
      RADIUS + this.CLOUDS_OFFSET,
      this.GLOBE_SEGMENTS,
      this.GLOBE_SEGMENTS
    )
    this.clouds.name = 'clouds'

    const cloudsTexture = this.textureLoader.load('/images/clouds.png')
    this.clouds.material = new MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.3,
    })
  }

  initGlow() {
    let options = {
      backside: true,
      color: '#0C4C95',
      size: RADIUS * 0.13,
      power: 6,
      coefficient: 0.35,
    }
    const halo = new SphereGeometry(RADIUS, this.GLOBE_SEGMENTS, this.GLOBE_SEGMENTS)
    this.glow = createGlowMesh(halo, options)

    const glowBackgroundGeometry = new CircleGeometry(280, this.GLOBE_SEGMENTS * 2)
    const glowBackgroundMaterial = new MeshBasicMaterial({ color: '#0C4C95' })
    glowBackgroundMaterial.side = DoubleSide
    this.glowBackground = new Mesh(glowBackgroundGeometry, glowBackgroundMaterial)
    this.glowBackground.position.set(0, 0, -789)
  }

  animateClouds() {
    this.clouds.rotation['y'] += Math.random() / 10000
  }

  getEarth() {
    return this.earth
  }

  getGlowBackground() {
    return this.glowBackground
  }
}

export default Earth
