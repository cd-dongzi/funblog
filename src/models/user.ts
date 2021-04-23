export interface User {
  _id: string
  name: string
  email: string
  refId?: string
  url?: string
  avatar?: string
  role: string[]
  ip: string
  userAgent: string
  system: AnyObject
  location: AnyObject
}
