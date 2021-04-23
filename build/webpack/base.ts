import webpack from 'webpack'

const createBaseConfig = ({ fallback } = { fallback: true }) => {
  const baseConfig: webpack.Configuration = {
    output: {
      clean: true
    },
    cache: {
      type: 'filesystem'
    },
    stats: {
      assets: true, // 展示资源信息
      builtAt: true, // 添加构建日期与时间信息
      colors: true, // 输出不同的颜色
      timings: true, // 时间信息
      cachedAssets: true, // 缓存资源的信息
      performance: true, // 当文件大小超过 performance.maxAssetSize配置值时，展示性能提性
      children: false, // 子模块的信息
      hash: false, // 编译哈希值的信息
      chunks: false, // 是否添加关于 chunk 的信息。 将 stats.chunks 设置为 false 会引发更少的输出。
      chunkModules: false, // chunkModules 将构建模块信息添加到 chunk 信息
      modules: false, // 构建模块的信息
      reasons: false, // 关于模块被引用的原因信息
      version: false // webpack版本信息
    }
  }
  if (fallback) {
    baseConfig.resolve = {
      ...(baseConfig.resolve || {}),
      fallback: {
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        process: 'process/browser'
      }
    }
  }
  return baseConfig
}
export default createBaseConfig
