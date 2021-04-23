declare namespace App {
  export interface Route {
    path: string
    exact?: boolean
    name?: string
    component?: any
    redirect?: string
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

interface AnyObject {
  [k: string]: any
}

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
