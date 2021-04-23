import { createStore, StoreEnhancer, Store, AnyAction } from 'redux'
import { combineReducers } from 'redux'
import app from './app'
import system from './system'
import navigation from './navigation'
import user from './user'
import blog from './blog'
import play from './play'
import comment from './comment'

import { AppAction } from './app/action'
import { SystemAction } from './system/action'
import { NavigationState } from './navigation/type'
import { NavigationAction } from './navigation/action'
import { UserState } from './user/type'
import { UserAction } from './user/action'
import { BlogAction } from './blog/action'
import { PlayAction } from './play/action'
import { CommentAction } from './comment/action'

interface StoreExt {
  asyncReducers: {
    [k: string]: any
  }
  registerModule: (name: string, reducers: any) => void
  unRegisterModule: (name: string) => void
}

const reducerMap = {
  system,
  app,
  navigation,
  user,
  blog,
  play,
  comment
}

const rootReducers = combineReducers(reducerMap)

export type IStoreState = ReturnType<typeof rootReducers> & {
  navigation?: NavigationState
  user?: UserState
}
export type IStoreAction = AppAction | SystemAction | UserAction | NavigationAction | BlogAction | PlayAction | CommentAction
export type IStore<T extends AnyAction = IStoreAction> = Store<IStoreState, T> & StoreExt

export const getStore = (preloadedState?: any, enhancer?: StoreEnhancer) => {
  const injectReducers = (store: IStore, name: string, reducers: any) => {
    store.asyncReducers[name] = reducers
    store.replaceReducer(
      combineReducers({
        ...reducerMap,
        ...store.asyncReducers
      })
    )
  }
  const store = createStore(rootReducers, preloadedState, enhancer) as IStore
  store.asyncReducers = {}
  store.registerModule = (name: string, reducers: any) => {
    injectReducers(store, name, reducers)
  }
  store.unRegisterModule = (name: string) => {
    const noopReducer = (state = {}) => state
    injectReducers(store, name, noopReducer)
  }
  return store
}
