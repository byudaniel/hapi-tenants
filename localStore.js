const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

const kTenant = 'TENANT_ID'

module.exports = {
  enter: () => asyncLocalStorage.enterWith(new Map()),
  getTenantId: () => asyncLocalStorage.getStore().get(key),
  setTenantId: (tenantId) =>
    asyncLocalStorage.getStore().set(kTenant, tenantId),
}
