import NativeModule from 'module'
import vm from 'vm'
import path from 'path'
import SourceMap from 'source-map'
import { CreateBundleRendererOptions, Renderer, IContext, RendererOptions } from './type'
export { CreateBundleRendererOptions, Renderer, IContext } from './type'

const filenameRE = /\(([^)]+\.js):(\d+):(\d+)\)$/

// sourceMap错误堆栈
const rewriteTraceLine = (trace: string, mapConsumers: Record<string, SourceMap.SourceMapConsumer>) => {
  const m = trace.match(filenameRE)
  const map = m && mapConsumers[m[1]]
  if (m != null && map) {
    const originalPosition = map.originalPositionFor({
      line: Number(m[2]),
      column: Number(m[3])
    })
    if (originalPosition.source != null) {
      const source = originalPosition.source
      const line = originalPosition.line
      const column = originalPosition.column
      const mappedPosition = '(' + source.replace(/^webpack:\/\/\//, '') + ':' + String(line) + ':' + String(column) + ')'
      return trace.replace(filenameRE, mappedPosition)
    } else {
      return trace
    }
  } else {
    return trace
  }
}

const rewriteErrorTrace = (e: Error, mapConsumers: Record<string, SourceMap.SourceMapConsumer>) => {
  if (e && typeof e.stack === 'string') {
    e.stack = e.stack
      .split('\n')
      .map((line) => {
        return rewriteTraceLine(line, mapConsumers)
      })
      .join('\n')
  }
}

const createSourceMapConsumers = (rawMaps: Record<string, any>) => {
  const maps: Record<string, SourceMap.SourceMapConsumer> = {}
  Object.keys(rawMaps).forEach((file) => {
    maps[file] = new SourceMap.SourceMapConsumer(rawMaps[file])
  })
  return maps
}

/**
 * 创建沙盒环境，获取打包文件的数据
 * @param files
 * @returns
 */
const compileModule = (files: Record<string, string>) => {
  const compiledScripts: Record<string, any> = {}
  // 执行沙盒环境获取运行脚本
  const getCompiledScript = (filename: string): vm.Script => {
    if (compiledScripts[filename]) {
      return compiledScripts[filename]
    }
    const code = files[filename]
    const wrapper = NativeModule.wrap(code)
    const script = new vm.Script(wrapper, {
      filename: filename,
      displayErrors: true
    })
    compiledScripts[filename] = script
    return script
  }

  const evaluateModule = (filename: string, evaluatedFiles: Record<string, any> = {}): any => {
    if (evaluatedFiles === void 0) evaluatedFiles = {}

    if (evaluatedFiles[filename]) {
      return evaluatedFiles[filename]
    }

    const script = getCompiledScript(filename)
    const compiledWrapper = script.runInThisContext()
    const m: any = { exports: {} }
    const r = (file: string) => {
      file = path.posix.join('.', file)
      // 服务端依赖的文件
      if (files[file]) {
        return evaluateModule(file, evaluatedFiles)
      } else {
        return require(file)
      }
    }
    compiledWrapper.call(m.exports, m.exports, r, m)
    const res = Object.prototype.hasOwnProperty.call(m.exports, 'default') ? m.exports.default : m.exports
    evaluatedFiles[filename] = res
    return res
  }
  return evaluateModule
}

// 返回server入口文件的函数
const createRunner = (entry: string, files: Record<string, string>) => {
  const evaluate = compileModule(files)
  return (context: IContext, opts?: RendererOptions) => {
    let runner: any
    return new Promise<string>((resolve, reject) => {
      if (!runner) {
        runner = evaluate(entry)
      }
      runner(context, opts).then(resolve).catch(reject)
    })
  }
}

export const createBundleRenderer = (options: CreateBundleRendererOptions): Renderer => {
  const entry = options.serverManifest.entry
  const files = options.serverManifest.files
  const maps = createSourceMapConsumers(options.serverManifest.maps)
  const run = createRunner(entry, files)
  return {
    renderToString: (context: IContext = {}, opts?: RendererOptions) => {
      return new Promise<string>((resolve, reject) => {
        context.loadableStats = options.loadableStats
        context.inputFileSystem = options.inputFileSystem
        run(context, opts)
          .then((html) => {
            resolve(html)
          })
          .catch((err) => {
            rewriteErrorTrace(err, maps)
            reject(err)
          })
      })
    }
  }
}
