// 引入模块
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const path = require('path');
const url = require('url');
const http = require('http');
const sha1 = require('node-sha1');
const cryptoJS = require('crypto-js');
const superagent = require('superagent')

const AppId = '******',
  SecretId = '******',
  SecretKey = '******';
// 创建实例
const cos = new COS({
  AppId: AppId,
  SecretId: SecretId,
  SecretKey: SecretKey,
});

const tx_prefix = '******'
let Bucket = '******',
  Region = '******'
module.exports = () => {

  const dictionary_order = (dict, type, sort) => {
    let str = ''
    if (sort) {
      for (let key of Object.keys(dict)) {
        if (type) {
          str += `${key}=${decodeURI(dict[key])}&`
        } else {
          str += `${key}=${dict[key]}&`
        }

      }
    } else {
      for (let key of Object.keys(dict).sort()) {
        if (type) {
          str += `${key}=${decodeURI(dict[key])}&`
        } else {
          str += `${key}=${dict[key]}&`
        }

      }
    }

    return str.substr(0, str.length - 1)
  }



  return async (ctx, next) => {
    console.log('--------------------')
    let sign_time = `${new Date('2017-12-24').getTime()};${new Date('2017-1-24').getTime()}`,
      sign_algorithm = sha1('sha1'),
      HttpMethod = ctx.method.toLocaleLowerCase(),
      HttpURI = url.parse(ctx.url).pathname,
      HttpParameters = dictionary_order(url.parse(ctx.url, true).query);
    HttpHeaders = dictionary_order(ctx.header, true);

    let SignKey = cryptoJS.HmacSHA1(`[${sign_time}]`, SecretKey).toString(),
      HttpString = `[${HttpMethod}]\n[${HttpURI}]\n[${HttpParameters}]\n[${HttpHeaders}]\n`,
      StringToSign = `[${sign_algorithm}]\n[${sign_time}]\n${sha1(HttpString)}\n`,
      Signature = cryptoJS.HmacSHA1(SignKey, StringToSign);

    let params = {
      'q-sign-algorithm': sign_algorithm,
      'q-ak': SecretId,
      'q-sign-time': sign_time,
      'q-key-time': sign_time,
      'q-header-list': Object.keys(ctx.request.header).join(';'),
      'q-url-param-list': Object.values(ctx.request.header).join(';'),
      'q-signature': Signature
    };

    let paramsStr = dictionary_order(params, false, true);

    let options = {
      method: 'put',
      host: `${Bucket}-${AppId}.cos.${Region}.myqcloud.com`,
      header: {
        Authorization: paramsStr
      }
    }
    await next()
  }
}