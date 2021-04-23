import * as Sentry from '@sentry/node'
import rootConfig from '@root/src/shared/config'

Sentry.init({
  dsn: rootConfig.sentry.dsn,
  tracesSampleRate: 1.0,
  enabled: rootConfig.openSentry
})

export default Sentry
