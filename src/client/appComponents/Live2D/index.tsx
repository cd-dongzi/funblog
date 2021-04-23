import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './style.less'

const Live2D = () => {
  const system = useSelector((state: IStoreState) => state.system)
  const loadLive2d = useCallback(
    (modelId: number, texturesId: number) => {
      const url = `${system.appHost}/api/client/live2d/${modelId}/textures/${texturesId}`
      window.loadlive2d('live2d', url, console.log('[Status]', 'live2d', `模型${modelId}-${texturesId}加载完成`))
    },
    [system.appHost]
  )
  useEffect(() => {
    // 加载脚本
    const loadScript = async () => {
      await import('@/assets/libs/live2d.min.js')
      return
    }
    const load = async () => {
      await loadScript()
      loadLive2d(0, 0)
    }
    load()
  }, [loadLive2d])
  return <canvas id="live2d" width="280" height="250"></canvas>
}

export default Live2D
