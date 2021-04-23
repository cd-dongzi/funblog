import clientDev from './client.dev'
import adminDev from './admin.dev'
import serverDev from './server.dev'
import clientProd from './client.prod'
import adminProd from './admin.prod'
import serverProd from './server.prod'
import webpack from 'webpack'

export type Configuration = webpack.Configuration & {
  output: {
    path: string
  }
  name: string
  entry: any
}
export default (NODE_ENV: ENV): [Configuration, Configuration, Configuration] => {
  if (NODE_ENV === 'development') {
    return [clientDev as Configuration, serverDev as Configuration, adminDev as Configuration]
  }
  return [clientProd as Configuration, serverProd as Configuration, adminProd as Configuration]
}
