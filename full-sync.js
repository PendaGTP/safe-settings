const appFn = require('./')
const { FULL_SYNC_NOOP } = require('./lib/env')
const { createProbot } = require('probot')

async function performFullSync (appFn, noop) {
  const probot = createProbot()
  probot.log.info(`Starting full sync with NOOP=${noop}`)

  try {
    const app = appFn(probot, {})
    const settings = await app.syncInstallation(noop)

    if (settings.errors && settings.errors.length > 0) {
      probot.log.error('Errors occurred during full sync.')
      process.exit(1)
    }

    probot.log.info('Full sync completed successfully.')
  } catch (error) {
    process.stdout.write(`Unexpected error during full sync: ${error}\n`)
    process.exit(1)
  }
}

performFullSync(appFn, FULL_SYNC_NOOP).catch((error) => {
  console.error('Fatal error during full sync:', error)
  process.exit(1)
})
