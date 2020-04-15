const localStore = require('./localStore')

module.exports = {
  plugin: require('./hapiTenants'),
  getTenantId: () => localStore.getTenantId(),
}
