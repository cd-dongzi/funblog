import { routes } from '@/router'

/**
 * 通过路由表获取路由
 *
 * @export
 * @param {string} path
 * @param {App.Route[]} routes
 * @returns {((App.Route & { child?: App.Route }) | null)}
 */
export function getRouteByRoutes(
  path: string,
  options: { isGroup: boolean } = { isGroup: false }
): (App.Route & { child?: App.Route }) | null {
  for (let i = 0; i < routes.length; i++) {
    const o = routes[i]
    if (o.children) {
      const o1 = o.children.find((r) => r.path === path)
      if (o1) {
        if (options.isGroup) {
          return {
            ...o,
            child: o1
          }
        }
        return o1
      }
    }
    if (o.path === path) {
      return o
    }
  }
  return null
}
