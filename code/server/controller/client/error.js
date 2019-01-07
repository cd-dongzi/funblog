export default {
  async captureGlobal(ctx, next) {
    console.log(ctx.request.body)
    console.log(111)
  }
}