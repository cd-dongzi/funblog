import koaRouter from 'koa-router'
import request from 'request'
const router = koaRouter()
router.post('/result', async (ctx, next) => {
    let text = ctx.request.body.text
    ctx.body = await getResult(text)
})

function getResult (text) {
    return new Promise(r => {
        const url = 'http://openapi.tuling123.com/openapi/api/v2'
        const userInfo = {
            "apiKey": "753fd28d57b94025af42f07ac36cee17",
            "userId": "chendong"
        }
        var opts = {
            method: 'POST',
            url,
            json: true,
            body: {
                reqType: 0,
                perception: {
                    inputText: {
                        text
                    }
                },
                userInfo
            },
            headers: {
                'content-type': 'application/json',
            }
        }
        request.post(opts, (err, res, body) => {
            let str = checkCode(body.intent.code)
            if (str) {
                r([{values: {text: str}}])
            }else{
                r(body.results)
            }
        })
    })
}
function checkCode (code) {
    let str = ''
    switch (code) {
        case 4003: 
            str = '主人说今天让我休息了，不让我跟你们聊天啦，我们明天再聊吧，我要休息咯！！！'
        case 4602: 
            str = '你说的话太多了，我记不住啦！！！'
        case 5000:
            str = '我目前只能听懂人类的语言!!!'
    }
    return str
}
export default router