import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './style.less'

type Props = {
  show: boolean
}
interface AppearLoading {
  (props: Props): JSX.Element | null
}

const AppearLoading: AppearLoading = ({ show }) => {
  const ref = useRef<HTMLDivElement>(null)
  const onExited = () => {
    ref.current?.parentNode?.removeChild(ref.current)
  }
  return (
    <CSSTransition
      in={show}
      appear
      classNames="appear-loading"
      addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      onExited={onExited}
    >
      <div className="appear-loading" ref={ref}>
        <div className="appear-loading__container">
          <div className="object object_one"></div>
          <div className="object object_two"></div>
          <div className="object object_three"></div>
          <div className="object object_four"></div>
          <div className="object object_five"></div>
          <div className="object object_six"></div>
          <div className="object object_seven"></div>
          <div className="object object_eight"></div>
          <div className="object object_big"></div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default AppearLoading
