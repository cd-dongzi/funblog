import { createContext, Dispatch } from 'react'

export interface TransfromBoxState {
  show: boolean
}
type ISetShowTransformBoxAction = IAction<typeof SET_SHOW_TRANSFORMBOX, boolean>
export type TransfromBoxAction = ISetShowTransformBoxAction

type ContextState = TransfromBoxState & {
  dispatch: Dispatch<TransfromBoxAction>
}
const SET_SHOW_TRANSFORMBOX = 'SET_SHOW_TRANSFORMBOX'

export const initState: TransfromBoxState = {
  show: false
}

// reducer
export const transfromBoxReducer = (state: TransfromBoxState, action: TransfromBoxAction) => {
  switch (action.type) {
    case SET_SHOW_TRANSFORMBOX: {
      return {
        ...state,
        show: action.payload
      }
    }
    default:
      return state
  }
}

// actions
export const setShowTransformBox = (show: boolean): ISetShowTransformBoxAction => {
  return {
    type: SET_SHOW_TRANSFORMBOX,
    payload: show
  }
}

export const TransformBoxContext = createContext<ContextState>(initState as ContextState)
