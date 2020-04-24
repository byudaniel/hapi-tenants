const url = require('url')
const localStore = require('./localStore')

module.exports = {
  name: 'hapiTenants',
  version: '0.3.0',
  register: async function (server, { hostMappings = {}, log }) {
    server.ext({
      type: 'onRequest',
      method: function (request, h) {
        let tenantId = request.headers['tenant-id']

        if (!tenantId) {
          const matchingHostKey = Object.keys(hostMappings).find((host) =>
            request.headers.host.includes(host)
          )

          tenantId = hostMappings[matchingHostKey]
        }

        if (tenantId) {
          // Setup store for current request
          localStore.enter()
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
