import { IStoreState } from '@/store'
import { Store } from 'redux'
import { Location } from 'history'
import { useLocation } from 'react-router'
// 路由过渡方向
export const getRouterDirection = (store: Store<IStoreState>, location: Location) => {
  const state = store.getState()
  const navigations = state.navigation?.navigations
  if (!navigations) {
    return 'forward'
  }
  const index = navigations.findIndex((p) => p.key === (location.key || ''))
  if (index > -1) {
    return 'back'
  } else {
    return 'forward'
  }
}
