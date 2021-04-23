declare namespace App {
  export interface Route {
    path?: string
    name?: string
    icon?: string
    title?: string
    component?: any
    redirect?: string
    children?: Route[]
    hiddenLayout?: boolean
    hiddenTabView?: boolean
    disabledAuth?: boolean
  }
  export type Routes = Route[]
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

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
  onLoad?: () => void
  loading?: boolean
}

interface RouterParams {
  params: any
  query: any
}

interface PageInitOptions {
  disabled: boolean
}
