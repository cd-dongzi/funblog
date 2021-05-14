import { IStore, IStoreAction } from '@client/store'
import { Context } from 'koa'
import MFS from 'memory-fs'
export interface CreateBundleRendererOptions {
  serverManifest: any
  loadableStats: any
  inputFileSystem?: MFS
}

export type IContext = {
  loadableStats?: any
  inputFileSystem?: MFS
  ctx?: Context
  [k: string]: any
}
export interface Renderer {
  renderToString: (context: IContext, opts?: RendererOptions) => Promise<string>
}
export interface RendererOptions {
  beforeRender?: (store: IStore<IStoreAction>) => void
}
