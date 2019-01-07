import fs from 'fs'

/**
 * index.json给所有路径添加前缀
 * @param {*} prefix 
 * @param {*} data 
 */
export const addPrefix = (prefix, data) => {
  for (const key in data) {
    const val = data[key]
    if ((typeof val === 'string' && val.indexOf('json') >= 0) || key === 'model') {
      data[key] = prefix + data[key]
    }
    if (key === 'textures') {
      data.textures = data.textures.map(item => prefix + item)
    }
    if (key === 'expressions') {
      data[key] = data[key].map(item => {
        item.file = prefix + item.file
        return item
      })
    }
    if (key === 'motions') {
      data[key] = motions(data[key])
    }
  }

  function motions(obj) {
    for (const key in obj) {
      obj[key] = obj[key].map(item => {
        item.file = prefix + item.file
        return item
      })
    }
    return obj
  }
  return data
}

/**
 * 获取指定路径下的index.json文件
 * @param {*} dirPath 
 */
export const readDirJson = (dirPath) => {
  let jsonFiles = []
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const currentPath = `${dirPath}/${file}`
    if (file === 'index.json') {
      jsonFiles.push(currentPath)
    }
    if (fs.statSync(currentPath).isDirectory()) {
      jsonFiles = jsonFiles.concat(readDirJson(currentPath))
    }
  })
  return jsonFiles
}

/**
 * 读取JSON文件内容
 * @param {*} pathname 
 */
export const readJson = (pathname) => {
  let bin = fs.readFileSync(pathname)
  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }
  return bin.toString('utf-8')
}

/**
 * 判断是否是一个数组
 * @param {*} val 
 */
export const isIntNum = (val) => {
  let re = /^[0-9]+$/
  return re.test(val)
}