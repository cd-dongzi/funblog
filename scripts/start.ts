import path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@root': path.resolve(__dirname, '../'),
  '@server': path.resolve(__dirname, '../src/server'),
  '@client': path.resolve(__dirname, '../src/client'),
  '@admin': path.resolve(__dirname, '../src/admin')
})

if (process.env.NODE_ENV === 'production') {
  require('./build')
} else {
  require('./dev')
}
