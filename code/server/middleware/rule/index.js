import Path from 'path'
import fs from 'fs'


// 是否是目录
function isDir(path) {
  return fs.statSync(path).isDirectory()
}

// 遍历目录
function readdir(path) {
  //readdirSync: 方法将返回一个包含“指定目录下所有文件名称”的数组对象。
  //extname: 返回path路径文件扩展名，如果path以 ‘.' 为结尾，将返回 ‘.'，如果无扩展名 又 不以'.'结尾，将返回空值。
  //basename: path.basename(p, [ext]) p->要处理的path ext->要过滤的字符
  let obj = {}
  fs.readdirSync(path).forEach(filename => {
    const filePath = Path.join(path, filename)
    if (isDir(filePath)) {
      obj[filename] = readdir(filePath)
    } else {
      let extname = Path.extname(filename);
      if (extname === '.js') {
        let name = Path.basename(filename, extname)
        let data = require(Path.join(path, filename))
        obj[name] = data && data.default
      }
    }
  })
  return obj
}

export default opts => {
  let {
    app,
    rules = []
  } = opts
  if (!app) {
    throw new Error("the app params is necessary!")
  }

  app.router = {};
  const appKeys = Object.keys(app)
  rules.forEach((item) => {
    let {
      path,
      name
    } = item
    if (appKeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`)
    }
    let content = {};
    content = readdir(path)
    app[name] = content
  })
}