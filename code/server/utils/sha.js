var crypto = require('crypto'); //加载crypto库
// console.log(crypto.getHashes()); //打印支持的hash算法

// var content = 'password';//加密的明文；
// var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
// md5.update(content);
// var d = md5.digest('hex');  //加密后的值d
// console.log("加密的结果："+d);


/********hmac-sha1加密***************/
var content = 'password'; //加密的明文；
var Signture = crypto.createHmac('sha1', content); //定义加密方式
Signture.update(content);
var miwen = Signture.digest().toString('base64'); //生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
console.log("加密的结果f：" + miwen);