const localStore = require('./localStore')

const kTenant = 'TENANT_ID'

module.exports = {
  name: 'hapiTenants',
  version: '0.1.0',
  register: async function (server, { tenantResources = {} }) {
    server.ext({
      type: 'onRequest',
      method: function (request, h) {
        localStore.enterWith(new Map())
        const store = localStore.getStore()
        const tenantId = request.headers['tenant-id']

        if (tenantId) {
          store.set(kTenant, tenantId)
          Object.entries(tenantResources).forEach(([key, resourceSelector]) => {
            store.set(key, resourceSelector(tenantId))
          })
        }

        return h.continue
      },
    })
  },
}
