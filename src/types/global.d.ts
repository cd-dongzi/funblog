declare namespace App {
  export interface Route {
    path?: string
    exact?: boolean
    name?: string
    icon?: string
    title?: string
    component?: any
    redirect?: string
    children?: Route[]
    noLayout?: boolean
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

declare namespace NodeJS {
  interface Process {
    APP_HOST: string
    APP_HREF: string
    STORE_STATE: AnyObject
  }
}
declare namespace React {
  export interface CSSProperties {
    [k: string]: any
  }
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '@/assets/libs/live2d.min.js'

interface IAction<T = string, P = any> {
  type: T
  payload: P
}

interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

type ResponseList<T> = ResponseData<{
  list: T[]
  total: number
  totalPages: number
}>

type ApiParamsList<T> = {
  page?: number
  size?: number
} & T

interface PageProps {
  // onLoad?: () => void
  loading?: boolean
  children?: any
}

interface RouterParams {
  params: any
  query: any
}

interface PageInitOptions {
  disabled: boolean
}
