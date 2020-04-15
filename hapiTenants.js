const url = require('url')
const localStore = require('./localStore')

module.exports = {
  name: 'hapiTenants',
  version: '0.1.0',
  register: async function (server, { domainMappings = {}, log }) {
    server.ext({
      type: 'onRequest',
      method: function (request, h) {
        // Setup store for current request
        localStore.enter()

        let tenantId = request.headers['tenant-id']

        if (!tenantId) {
          const refererDomain = url.parse(request.headers.referer).domain

          const matchingDomainKey = Object.keys(domainMappings).find((domain) =>
            refererDomain.includes(domain)
          )

          if (matchingDomainKey) {
            tenantId = domainMappings[tenantId]
          }
        }

        if (tenantId) {
          localStore.setTenantId(tenantId)
        }

        if (!tenantId && log) {
          log.error(
            { referer: request.headers.referer, requestUrl: request.url.path },
            'Tenant could not be found from request'
          )
        }

        return h.continue
      },
    })
  },
}
