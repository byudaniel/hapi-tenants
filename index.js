const localStore = require('./localStore')

module.exports = {
  plugin: require('./hapiTenants'),
  getTenantId: () => localStore.getTenantId(),
  setTenantId: (tenantId) => localStore.setTenantId(tenantId),
  enter: () => localStore.enter(),
}
