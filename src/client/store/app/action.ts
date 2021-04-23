import { AppState, SERVER_RENDER_PAGE_NAME, SET_IS_SERVER_RENDER, SET_SCREEN_SIZE, SET_APP_STATE } from './type'

type ISetServerRenderPageName = IAction<typeof SERVER_RENDER_PAGE_NAME, string>
type ISetIsServerRender = IAction<typeof SET_IS_SERVER_RENDER, boolean>
type ISetScreenSize = IAction<typeof SET_SCREEN_SIZE, string>
type ISetAppState = IAction<typeof SET_APP_STATE, Partial<AppState>>

export const setServerRenderPageName = (path: string): ISetServerRenderPageName => {
  return {
    type: SERVER_RENDER_PAGE_NAME,
    payload: path
  }
}

export const setIsServerRender = (isServerRender: boolean): ISetIsServerRender => {
  return {
    type: SET_IS_SERVER_RENDER,
    payload: isServerRender
  }
}

export const setScreenSize = (screenSize: string): ISetScreenSize => {
  return {
    type: SET_SCREEN_SIZE,
    payload: screenSize
  }
}

export const setAppState = (state: Partial<AppState>): ISetAppState => {
  return {
    type: SET_APP_STATE,
    payload: state
  }
}

export type AppAction = ISetIsServerRender | ISetServerRenderPageName | ISetScreenSize | ISetAppState
