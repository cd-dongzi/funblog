import Base from './base'
export default class Live2d extends Base{
    // 更换模型
    static changeModel ({modelType='rand', ...params}) {
        return this.get(`${this.baseUrl}/live2d/${modelType}/model`, params)
    }

    // 更换服装
    static changeTextures ({texturesType='switch', ...params}) {
        return this.get(`${this.baseUrl}/live2d/${texturesType}/textures`, params)
    }

    // 加载模型
    static loadLive2d (modelId, texturesId) {
        return this.get(`${this.baseUrl}/live2d/model/${modelId}/textures/${texturesId}`)
    }
}