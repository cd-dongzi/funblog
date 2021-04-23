// import Sentry from '@/utils/sentry'

// window.onerror = (msg, url, line, col, error) => {
//   console.log('onerror')
//   console.log(msg, url, line, col, error)
//   return true
// }
// window.addEventListener(
//   'error',
//   ({ filename, colno, lineno, message }) => {
//     console.log('捕获到异常：')
//     console.log('文件名：', filename)
//     console.log('列：', colno)
//     console.log('行：', lineno)
//     console.log('错误信息：', message)
//   },
//   true
// )
// window.addEventListener(
//   'error',
//   (err) => {
//     console.log('捕获到异常：')
//     console.log(err)
//     Sentry.captureException(err)
//   },
//   true
// )

// window.addEventListener('unhandledrejection', (err) => {
//   console.log('unhandledrejection')
//   console.log(err)
//   Sentry.captureException(err)
// })
