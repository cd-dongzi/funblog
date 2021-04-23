import { createStore, StoreEnhancer, Store, AnyAction } from 'redux'
import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import { AppAction } from './app/action'
import { UserAction } from './user/action'

const reducerMap = {
  app,
  user
}

const rootReducers = combineReducers(reducerMap)

export type IStoreState = ReturnType<typeof rootReducers>
export type IStoreAction = AppAction | UserAction
export type IStore<T extends AnyAction = IStoreAction> = Store<IStoreState, T>

export default createStore(
  rootReducers,
  window.__PRELOADED_STATE__,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore
