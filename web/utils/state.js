import { useState, useEffect } from 'react'

/**
 * @template V
 * @class
 */
class ModalState {
  #state = new Map()
  #listeners = new Map()

  /**
   * Set listener to react on changes of `name` property.
   * @param {string} name
   * @param {(value: V) => void} listener
   * @returns {() => void}
   */
  on(name, listener) {
    const definedListeners = this.#listeners.get(name) ?? []
    this.#listeners.set(name, definedListeners.concat([listener]))

    return () =>
      this.#listeners.set(
        name,
        (this.#listeners.get(name) ?? []).filter((fn) => fn !== listener)
      )
  }

  /**
   * Get value from the state.
   * @param {string} name
   * @returns {V | undefined}
   */
  get(name) {
    return this.#state.get(name)
  }

  /**
   * Update value in the state.
   * @param {string} name
   * @param {V} value
   */
  set(name, value) {
    this.#state.set(name, value)
    ;(this.#listeners.get(name) ?? []).forEach((fn) => fn(value))
  }
}

const _modalState = new ModalState()

/**
 * Subscribe on `name` changes.
 * @param {string} name
 * @param {V} [initial]
 * @returns {[V, (function(value: V): void)]}
 */
export const useGlobalState = (name, initial) => {
  const [value, setValue] = useState(_modalState.get(name) ?? initial)

  useEffect(() => _modalState.on(name, setValue), [value])

  return [value, (value) => _modalState.set(name, value)]
}
