import { Vector2, Vector3 } from 'three'

export function coordinatesToPosition(coordinates, radius) {
  const [lat, long] = coordinates
  const phi = (lat * Math.PI) / 180
  const theta = ((long - 180) * Math.PI) / 180

  const x = -radius * Math.cos(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi)
  const z = radius * Math.cos(phi) * Math.sin(theta)

  return [x, y, z]
}

export function getMouse(event, canvas) {
  const rectBounding = canvas.getBoundingClientRect()
  const mouse = new Vector2()
  if (event.touches && event.touches.length) {
    event.clientX = event.touches[0].clientX
    event.clientY = event.touches[0].clientY
  } else if (event.changedTouches && event.changedTouches.length) {
    event.clientX = event.changedTouches[0].clientX
    event.clientY = event.changedTouches[0].clientY
  }
  mouse.x = ((event.clientX - rectBounding.left) / rectBounding.width) * 2 - 1
  mouse.y = -((event.clientY - rectBounding.top) / rectBounding.height) * 2 + 1
  return mouse
}

export function convertVector3ToVector2({ x, y, z }, canvas, camera) {
  const point = new Vector3()
  point.x = x
  point.y = y
  point.z = z
  point.project(camera)
  point.x = Math.round(((point.x + 1) * canvas.width) / 2)
  point.y = Math.round(((-point.y + 1) * canvas.height) / 2)
  return point
}
