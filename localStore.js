const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

module.exports = {
  asyncLocalStorage,
  get: (key) => asyncLocalStorage.getStore().get(key),
  set: (key, value) => asyncLocalStorage.getStore().set(key, value),
}
