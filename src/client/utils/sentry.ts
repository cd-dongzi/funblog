import * as Sentry from '@sentry/react'
import rootConfig from '@root/src/shared/config'

Sentry.init({
  dsn: rootConfig.sentry.dsn,
  enabled: rootConfig.openSentry
})

export default Sentry
