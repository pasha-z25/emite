importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '848589731658',
  projectId: 'emite-67a76',
  apiKey: 'AIzaSyCsQaZ3gofkyVOeepyzBeUDityPIGf1L9g',
  appId: '848589731658:web:42a197be068c4ce850f3b3',
})

const messaging = firebase.messaging()

//background messages, when website not open
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: 'Background Message body.',
    icon: payload.notification.icon,
    data: payload.data,
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})

//foreground messages, when website is open
self.addEventListener('push', async (payload) => {
  const data = payload.data.json()
  const notificationTitle = data.notification.title
  const notificationOptions = {
    body: data.notification.body,
    icon: data.notification.icon,
    data: data.data,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

//push message click listener
self.addEventListener('notificationclick', function (event) {
  event.notification.close()

  var promise = new Promise(function (resolve) {
    setTimeout(resolve, 500)
  }).then(function () {
    return self.clients.openWindow(event.notification.data.url)
  })
  event.waitUntil(promise)
})
