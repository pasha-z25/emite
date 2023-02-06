import { CircleGeometry, DoubleSide, Mesh, RingGeometry, MeshLambertMaterial } from 'three'
import { coordinatesToPosition } from './utils'
import { RADIUS } from './enums'

class Marker {
  MARKER_SEGMENTS = 20
  MARKER_RADIUS = 8
  MARKER_SCALE = 1
  marker
  visibleMarker
  glowMesh
  color

  constructor({ color = 'red', id, coordinates }, clientWidth) {
    this.color = color
    this.marker = this.createTouchArea(id)
    this.visibleMarker = this.createVisibleMarker(color, coordinates)
    this.changeMarkerSize(clientWidth)
    this.defaultGlow()
    this.setMarkerPosition(coordinates)
  }

  createTouchArea(id) {
    const touchGeometry = new CircleGeometry(this.MARKER_RADIUS * 2, this.MARKER_SEGMENTS)

    const touchMaterial = new MeshLambertMaterial()
    const markerArea = new Mesh(touchGeometry, touchMaterial)
    markerArea.name = 'marker'
    markerArea.material.side = DoubleSide
    markerArea.material.opacity = 0
    markerArea.material.transparent = true

    markerArea.uuid = id
    return markerArea
  }

  createVisibleMarker(color) {
    const markerGeometry = new CircleGeometry(this.MARKER_RADIUS, this.MARKER_SEGMENTS)

    const markerMaterial = new MeshLambertMaterial({ color })
    const visibleMarker = new Mesh(markerGeometry, markerMaterial)
    visibleMarker.name = 'visibleMarker'
    visibleMarker.material.side = DoubleSide
    return visibleMarker
  }

  changeMarkerSize(clientWidth) {
    let markerScale = 1.1 - clientWidth / 1000
    let powValue = 1.5 - clientWidth / 1000
    let scale = Math.pow(markerScale, powValue)
    this.marker.scale.x = this.MARKER_SCALE * scale
    this.marker.scale.y = this.MARKER_SCALE * scale
    this.marker.scale.z = this.MARKER_SCALE * scale

    this.visibleMarker.scale.x = this.MARKER_SCALE * scale
    this.visibleMarker.scale.y = this.MARKER_SCALE * scale
    this.visibleMarker.scale.z = this.MARKER_SCALE * scale
  }

  setMarkerPosition(position) {
    const [x, y, z] = coordinatesToPosition(position, RADIUS)
    const [touchX, touchY, touchZ] = coordinatesToPosition(position, RADIUS * 1.01)
    this.marker.position.set(touchX, touchY, touchZ)
    this.visibleMarker.position.set(x, y, z)
  }

  defaultGlow() {
    this.addGlow('white', { innerRadius: 1.2, outerRadius: 1.6 })
  }

  addGlow(color = this.color, radius = { innerRadius: 1.2, outerRadius: 1.9 }) {
    this.removeGlow()
    const glowGeometry = new RingGeometry(
      this.MARKER_RADIUS * radius.innerRadius,
      this.MARKER_RADIUS * radius.outerRadius,
      this.MARKER_SEGMENTS
    )

    const glowMaterial = new MeshLambertMaterial({
      color: color,
      opacity: 0.8,
    })
    glowMaterial.side = DoubleSide
    this.glowMesh = new Mesh(glowGeometry, glowMaterial)
    this.visibleMarker.add(this.glowMesh)
  }

  removeGlow() {
    this.visibleMarker.remove(this.glowMesh)
  }
}

export default Marker
