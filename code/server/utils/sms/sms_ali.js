/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = '******'
const secretAccessKey = '******'
//初始化sms_client
let smsClient = new SMSClient({
  accessKeyId,
  secretAccessKey
})

const PhoneNumber = '******',
  PhoneNumbers = PhoneNumber,
  SignName = '******',
  TemplateCode = '******'

const isProd = process.env.NODE_ENV === 'production'

//发送短信
export const sendSMS = (TemplateParam) => {
  if (!isProd) {
    return
  }
  smsClient.sendSMS({
    PhoneNumbers, //必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为00+国际区号+号码，如“0085200000000”
    SignName, // 必填:短信签名-可在短信控制台中找到
    TemplateCode, // 必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
    TemplateParam // 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
  }).then(function (res) {
    let {
      Code
    } = res
    if (Code === 'OK') {
      //处理返回参数
      console.log(res)
    }
  }, function (err) {
    console.log('------------------------err-----------------------')
    console.log(err)
  })
}

// 个人留言
export const sendMeSMS = (TemplateParam) => {
  console.log('===========个人留言=============')
  console.log(TemplateParam)
  if (!isProd) {
    return
  }
  smsClient.sendSMS({
    PhoneNumbers,
    SignName,
    TemplateCode: '******',
    TemplateParam
  }).then(function (res) {
    let {
      Code
    } = res
    if (Code === 'OK') {
      //处理返回参数
      console.log(res)
    }
  }, function (err) {
    console.log('------------------------err-----------------------')
    console.log(err)
  })
}

// 文章留言
export const sendArticleSMS = (TemplateParam) => {
  console.log('===========文章留言=============')
  console.log(TemplateParam)
  if (!isProd) {
    return
  }
  smsClient.sendSMS({
    PhoneNumbers,
    SignName,
    TemplateCode: '******',
    TemplateParam
  }).then(function (res) {
    let {
      Code
    } = res
    if (Code === 'OK') {
      //处理返回参数
      console.log(res)
    }
  }, function (err) {
    console.log('------------------------err-----------------------')
    console.log(err)
  })
}

//查询短信发送详情
export const queryDetail = () => {
  if (!isProd) {
    return
  }
  smsClient.queryDetail({
    PhoneNumber,
    SendDate: 20180901,
    PageSize: '10',
    CurrentPage: "1"
  }).then(function (res) {
    let {
      Code,
      SmsSendDetailDTOs
    } = res
    if (Code === 'OK') {
      //处理发送详情内容
      console.log(SmsSendDetailDTOs)
    }
  }, function (err) {
    //处理错误
    console.log(err)
  })
}
