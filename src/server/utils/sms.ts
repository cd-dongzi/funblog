import Core from '@alicloud/pop-core'
import rootConfig from '@root/src/shared/config'
import createLogger from '@server/utils/log'
import ErrorUtils from '@server/utils/error'

const logger = createLogger()
type SmsTemplateParam = {
  title: string
  type: string
  name: string
  msg: string
}

const client = new Core({
  accessKeyId: rootConfig.sms.accessKeyId,
  accessKeySecret: rootConfig.sms.accessKeySecret,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

const params = {
  RegionId: 'cn-hangzhou',
  PhoneNumbers: rootConfig.sms.PhoneNumbers,
  SignName: rootConfig.sms.SignName
}
const requestOption = {
  method: 'POST'
}
const sendSms = async (query: AnyObject = {}) => {
  const data = { ...params, ...query }
  try {
    if (rootConfig.isRealProd) {
      await client.request('SendSms', data, requestOption)
    }
  } catch (e) {
    logger.external.error({
      action: 'SendSms',
      data,
      requestOption,
      errorMsg: ErrorUtils.getErrorMsg(e)
    })
  }
}

// 留言板
const sendSmsByComment = async (TemplateParam: SmsTemplateParam) => {
  await sendSms({
    TemplateCode: 'SMS_151690550',
    TemplateParam: JSON.stringify(TemplateParam)
  })
}

// 博客文章留言
const sendSmsByBlogComment = async (TemplateParam: SmsTemplateParam) => {
  await sendSms({
    TemplateCode: 'SMS_151900009',
    TemplateParam: JSON.stringify(TemplateParam)
  })
}

export default { sendSmsByComment, sendSmsByBlogComment }
