require('./alias')

if (process.env.NODE_ENV === 'production') {
  require('./build')
} else {
  if (process.env.NODE_PROJECT_ENV === 'admin') {
    require('./uppack-admin')
  } else {
    require('../src/server/main')
  }
}
