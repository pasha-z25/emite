import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import { log } from '~/utils/helpers'

let singleton = Symbol()
let singletonEnforcer = Symbol()

// in this class we used singleton pattern to init firebase app once
export class FirebaseServices {
  config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  messaging = null
  notifyToken = null

  subscribersMap = new Map()

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
      throw 'Instantiation failed: use FirebaseServices.instance instead of new.'
    initializeApp(this.config)
    this.messaging = getMessaging()

    onMessage(this.messaging, (payload) => this.notifySubscribers(payload))
  }

  static get instance() {
    if (!this[singleton]) this[singleton] = new FirebaseServices(singletonEnforcer)
    return this[singleton]
  }

  getNotificationToken() {
    if (!this.notifyToken) {
      this.notifyToken = getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
    }
    return this.notifyToken
  }

  notifySubscribers(payload) {
    for (let action of this.subscribersMap.values()) {
      action({
        data: JSON.parse(payload.data.data),
        type: payload.data.type,
      })
    }
  }

  subscribeOnMessage(key, action) {
    this.subscribersMap.set(key, action)
  }

  unsubscribe(key) {
    this.subscribersMap.delete(key)
  }

  registerNotificationWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').catch(function (err) {
        console.log('Service worker registration failed, error')
        log('Service worker registration failed, error:', err)
      })
    } else {
      console.log('service workers not available')
    }
  }
}
