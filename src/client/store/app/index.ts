import config from '@/config'
import { AppState, SET_IS_SERVER_RENDER, SERVER_RENDER_PAGE_NAME, SET_SCREEN_SIZE, SET_APP_STATE } from './type'
import { AppAction } from './action'

const INIT_STATE: AppState = {
  layoutPageLoaded: false,
  pageLoaded: false,
  loadedInitData: false,
  showLoginBox: false,
  serverRenderPageName: '',
  isServerRender: true,
  screenSize: 'xl',
  layoutSize: 'large',
  viewSize: 'large',
  visitorsCount: 0
}
const app = (state = INIT_STATE, action: AppAction): AppState => {
  switch (action.type) {
    case SET_IS_SERVER_RENDER: {
      return {
        ...state,
        isServerRender: action.payload
      }
    }
    case SERVER_RENDER_PAGE_NAME: {
      return {
        ...state,
        serverRenderPageName: action.payload
      }
    }
    case SET_SCREEN_SIZE: {
      const layoutSize = config.screen.sizes.find((v) => action.payload === v.size)?.layout || 'large'
      const viewSize = config.screen.sizes.find((v) => action.payload === v.size)?.view || 'large'
      return {
        ...state,
        screenSize: action.payload,
        layoutSize,
        viewSize
      }
    }
    case SET_APP_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export default app
