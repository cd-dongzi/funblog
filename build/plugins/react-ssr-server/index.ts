import webpack from 'webpack'
import fs from 'fs'
import path from 'path'
import { isJS } from './utils'

export const DEFAULT_FILENAME = 'react-ssr-server-manifest.json'
const PLUGIN_NAME = 'react-ssr-server-plugin'

const defaultOptions = {
  filename: DEFAULT_FILENAME
}

type ReactSSRServerPluginOptions = typeof defaultOptions

interface Bundle {
  entry: string
  files: Record<string, string>
  maps: Record<string, any>
}
export default class ReactSSRServerPlugin {
  constructor(public options: ReactSSRServerPluginOptions = defaultOptions) {
    this.options = options
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_COUNT
        },
        () => {
          const entryInfo = compilation.entrypoints.get(Array.from(compilation.entrypoints.keys())[0])
          const entry = entryInfo?.getFiles()[0]
          if (!entry) {
            throw new Error('Server-side bundle should have one single entry file. ')
          }
          const bundle: Bundle = {
            entry: entry,
            files: {},
            maps: {}
          }
          const assets = compilation.getAssets()
          assets.forEach((asset) => {
            if (isJS(asset.name)) {
              bundle.files[asset.name] = asset.source.source() as string
              const mapContent = asset.source.map()
              if (mapContent) bundle.maps[asset.name] = mapContent
            }
            delete compilation.assets[asset.name]
          })
          const json = JSON.stringify(bundle, null, 2)
          const filename = this.options.filename
          compilation.assets[filename] = {
            source: () => {
              return json
            },
            size: () => {
              return json.length
            }
          } as any
        }
      )
    })
  }
}
