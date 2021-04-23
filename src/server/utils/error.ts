import Type from '@root/src/shared/type'
class ErrorUtils {
  static error(error: any) {
    throw new Error(error)
  }
  static parse(error: any) {
    if (typeof error === 'string') {
      return error
    }
    if (Type.isError(error)) {
      return error.message
    }
    return error
  }
  static getErrorMsg(e: any) {
    const error = ErrorUtils.parse(e)
    let message = 'Internal Server Error'
    if (typeof error === 'string') {
      message = error
    } else if (error.code) {
      message = error.data || message
    }
    return message
  }
}

export default ErrorUtils
