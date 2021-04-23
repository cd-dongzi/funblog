declare namespace App {
  export interface Route {
    path?: string
    name?: string
    icon?: string
    title?: string
    component?: any
    redirect?: string
    children?: Route[]
  }
  export type Routes = Route[]
}

declare namespace NodeJS {
  interface Process {
    APP_HOST: string
    APP_HREF: string
    STORE_STATE: AnyObject
  }
}
interface AnyObject {
  [k: string]: any
}
type ENV = 'development' | 'production' | 'none'
declare module 'koa2-connect'
declare module 'koa-sendfile'
declare module 'koa-send'
declare module 'highlight.js/lib/core'
declare module 'highlight.js/lib/languages/javascript'
declare module 'highlight.js/lib/languages/css'
declare module 'highlight.js/lib/languages/typescript'
declare module 'highlight.js/lib/languages/nginx'
