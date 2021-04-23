import { IStoreState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'
import Copyright from './copyright'
import './style.less'

type Props = unknown
interface MainFooter {
  (props: Props): JSX.Element | null
}

const MainFooter: MainFooter = () => {
  const app = useSelector((state: IStoreState) => state.app)
  return (
    <footer className="main-footer">
      <p className="visitors">大神到访数：{app.visitorsCount}</p>
      <Copyright />
    </footer>
  )
}

export default MainFooter
