import path from 'path'
import {
  addPrefix,
  readDirJson,
  readJson,
  changeTextures,
  isIntNum
} from './utils'
import {
  randNumber
} from 'utils/number'

// 拼接路径
const assetsPath = (...dirs) => path.posix.join.apply(path, dirs)

const modelJson = JSON.parse(readJson(path.resolve(__dirname, './models.json')))

// 模型
const {
  multiple: multipleModel,
  single: singleModels
} = modelJson
const models = multipleModel.concat(singleModels)
// 模型路径前缀
let modelPathPrefix = assetsPath($publicPath, 'live2d/model/')

// 模型文件前缀
function getModelFilePrefix(filePath) {
  return assetsPath('../../../../../', 'live2d/model/', filePath, '/')
}

// 获取模型所在目录
function getModelDir(modelId, texturesId = 0) {
  let filePath,
    isMultiple = modelId < multipleModel.length
  // 具备换装列表
  if (isMultiple) {
    filePath = models[modelId][0]
  } else {
    filePath = models[modelId][texturesId]
  }
  // 模型所在目录
  return assetsPath(modelPathPrefix, filePath)
}

// 检验ID 范围 并返回规定ID
function checkId(id, len) {
  if (isIntNum(id)) {
    if (id >= len) {
      return len - 1
    } else {
      return id
    }
  } else {
    return randNumber(0, len)
  }
}

// 获取随机model
function getRandModel(modelId, len) {
  let randModelId = randNumber(0, len)
  while (randModelId == modelId) {
    randModelId = randNumber(0, len)
  }
  return randModelId
}
// 获取顺序model
function getSwitchModel(modelId, len) {
  modelId++
  if (modelId >= len) {
    modelId = 0
  }
  return modelId
}
// 获取随机服装
function getRandTextures(texturesId, len) {
  let randTexturesId = randNumber(0, len)
  while (randTexturesId == texturesId) {
    randTexturesId = randNumber(0, len)
  }
  return randTexturesId
}
// 获取顺序服装
function getSwitchTextures(texturesId, len) {
  texturesId++
  if (texturesId >= len) {
    texturesId = 0
  }
  return texturesId
}

export default {
  //更换模型
  async changeModel(ctx, next) {
    try {
      log.clientTitle('更换模型')
      const {
        modelType
      } = ctx.params
      let {
        modelId,
        texturesId
      } = ctx.request.query

      // 获取模型ID
      if (modelType === 'rand') {
        modelId = getRandModel(modelId, models.length)
      } else {
        modelId = getSwitchModel(modelId, models.length)
      }

      const modelDir = getModelDir(modelId)
      const isMultiple = modelId < multipleModel.length
      // 获取服装ID
      if (!isIntNum(texturesId)) {
        if (isMultiple) {
          let texturesList = JSON.parse(readJson(assetsPath(modelDir, 'textures.cache')))
          // 随机
          if (modelType === 'rand') {
            texturesId = getRandTextures(texturesId, texturesList.length)
          } else {
            texturesId = getSwitchTextures(texturesId, texturesList.length) || 0
          }
        } else {
          let texturesList = models[modelId]
          // 随机
          if (modelType === 'rand') {
            texturesId = getRandTextures(texturesId, texturesList.length)
          } else {
            texturesId = getSwitchTextures(texturesId, texturesList.length) || 0
          }
        }
      }

      ctx.send({
        modelId,
        texturesId
      })
    } catch (err) {
      console.log(err)
      ctx.log.error(err)
      ctx.sendError('系统故障!')
    }
  },

  // 更换服装
  async changeTextures(ctx, next) {
    try {
      log.clientTitle('更换服装')
      const {
        texturesType
      } = ctx.params
      let {
        modelId,
        texturesId
      } = ctx.request.query
      const isMultiple = modelId < multipleModel.length

      const modelDir = getModelDir(modelId)

      if (isMultiple) {
        let texturesList = JSON.parse(readJson(assetsPath(modelDir, 'textures.cache')))
        // 随机
        if (texturesType === 'rand') {
          texturesId = getRandTextures(texturesId, texturesList.length)
        } else {
          texturesId = getSwitchTextures(texturesId, texturesList.length) || 0
        }
      } else {
        let texturesList = models[modelId]
        // 随机
        if (texturesType === 'rand') {
          texturesId = getRandTextures(texturesId, texturesList.length)
        } else {
          texturesId = getSwitchTextures(texturesId, texturesList.length) || 0
        }
      }

      ctx.send({
        modelId,
        texturesId
      })
    } catch (err) {
      ctx.log.error(err)
      ctx.sendError('系统故障!')
    }
  },

  //加载模型
  async loadLive2d(ctx, next) {
    try {
      let {
        modelId,
        texturesId
      } = ctx.params
      modelId = checkId(modelId, models.length)
      let filePath,
        isMultiple = modelId < multipleModel.length
      if (!isMultiple) {
        texturesId = checkId(texturesId, models[modelId].length)
      }

      // 具备换装列表
      if (isMultiple) {
        filePath = models[modelId][0]
      } else {
        filePath = models[modelId][texturesId]
      }
      // 模型所在目录
      const modelDir = assetsPath(modelPathPrefix, filePath)
      // 模型json文件所在路径
      const modelPath = assetsPath(modelDir, 'index.json')
      // 获取模型数据
      let data = JSON.parse(readJson(modelPath))
      // cache换装列表
      if (isMultiple) {
        let texturesList = JSON.parse(readJson(assetsPath(modelDir, 'textures.cache')))
        texturesId = texturesId >= texturesList.length ? texturesList.length - 1 : texturesId
        let textures = texturesList[texturesId]
        data.textures = Array.isArray(textures) ? textures : Array(textures)
      }
      // 给模型添加前缀
      data = addPrefix(getModelFilePrefix(filePath), data)
      ctx.body = data
    } catch (err) {
      ctx.log.error(err)
      ctx.sendError('系统故障!')
    }
  }
}
