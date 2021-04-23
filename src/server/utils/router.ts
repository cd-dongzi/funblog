import { matchPath } from 'react-router-dom'

export const matchRoutes = (
  routes: App.Routes,
  url: string,
  isRedirect = false
): {
  route: any
  url: string
} => {
  for (const route of routes) {
    const matchRoute = matchPath(url, route)
    if (matchRoute) {
      if (route.redirect) {
        return matchRoutes(routes, route.redirect, true)
      }
      const base = {
        route
      }
      if (isRedirect) {
        return {
          ...base,
          url: route.path as string
        }
      }
      return {
        ...base,
        url
      }
    }
  }
  return {
    route: null,
    url
  }
}
