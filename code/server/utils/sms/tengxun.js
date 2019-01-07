const QcloudSms = require("qcloudsms_js")

const appid = '******'
const appkey = "******"

// 需要发送短信的手机号码
const phoneNumbers = ['15273119291']

// 短信模板ID，需要在短信应用中申请
const templateId = '******'

// 签名,  签名参数使用的是`签名内容`，而不是`签名ID`
const smsSign = '******'

// 实例化QcloudSms
const qcloudsms = QcloudSms(appid, appkey)

function send() {
  const ssender = qcloudsms.SmsSingleSender()
  const params = ["******", "******"] //数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
  ssender.sendWithParam(86, phoneNumbers[0], templateId, params, smsSign, "", "", callback)
}



// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
  if (err) {
    console.log("err: ", err)
  } else {
    console.log("request data: ", res.req)
    console.log("response data: ", resData)
  }
}