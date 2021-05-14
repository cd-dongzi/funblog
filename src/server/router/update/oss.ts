// import OSS from 'ali-oss'
// import rootConfig from '@root/src/shared/config'
// const oss = rootConfig.oss
// const { accessKeyId, accessKeySecret, bucket, region, prefix } = oss
// const client = new OSS({
//   accessKeyId,
//   accessKeySecret,
//   bucket: '',
//   region
// })

export default (router: any) => {
  router.get('/updateOss/copyData', async (ctx: any, next: any) => {
    // client.copy('')
    ctx.send('ok')
  })
}
