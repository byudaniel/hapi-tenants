const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

const kTenant = 'TENANT_ID'

module.exports = {
  enter: () => asyncLocalStorage.enterWith(new Map()),
  getTenantId: () => {
    const store = asyncLocalStorage.getStore()

    if (!store) {
      return null
    }

    return store.get(kTenant)
  },
  setTenantId: (tenantId) => {
    const store = asyncLocalStorage.getStore()

    if (!store) {
      throw new Error('Store not set, did you call localStore.enter()?')
    }

    store.set(kTenant, tenantId)
  },
}
