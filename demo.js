const Hapi = require('@hapi/hapi')
const hapiTenants = require('./')

const dbs = {
  '1234': { save: () => 'Saved to db 1234' },
  '5678': { save: () => 'Saved to db 5678' },
}

const getDb = (tenantId) => {
  return dbs[tenantId]
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })

  await server.register({
    plugin: require('./hapiTenants'),
    options: {},
  })

  server.route({
    method: 'POST',
    path: '/save',
    handler: async (request, h) => {
      const db = dbs[hapiTenants.getTenantId()]
      const result = await db.save()
      return result
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
