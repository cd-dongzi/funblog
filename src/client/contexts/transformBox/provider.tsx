import React, { useReducer } from 'react'
import { TransformBoxContext, transfromBoxReducer, initState } from './index'

type Props = {
  children: any
}
interface TransformBoxProvider {
  (props: Props): JSX.Element | null
}

const TransformBoxProvider: TransformBoxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transfromBoxReducer, initState)
  return (
    <TransformBoxContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </TransformBoxContext.Provider>
  )
}

export default TransformBoxProvider
