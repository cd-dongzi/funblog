import React from 'react'
import { IStoreState } from '@/store'
import { useSelector } from 'react-redux'
import TransformBoxProvider from '@/contexts/transformBox/provider'
import classnames from 'classnames'
import LayoutMain from './main'
import LayoutMobile from './mobile'
import LayoutPC from './pc'
import MainFooter from './components/footer'
import LoginBtn from './components/loginBtn'
import BackTop from './components/backTop'
import './style.less'

type Props = {
  children: any
}
interface Layout {
  (props: Props): JSX.Element | null
}

const Layout: Layout = ({ children }) => {
  const app = useSelector((state: IStoreState) => state.app)
  const isLarge = app.layoutSize === 'large'
  return (
    <div
      id="layout"
      className={classnames(['layout-wrapper', 'layout-' + app.layoutSize, 'screen-' + app.screenSize, 'view-' + app.viewSize])}
    >
      <TransformBoxProvider>
        {isLarge ? <LayoutPC /> : <LayoutMobile />}
        <LayoutMain>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              children: (
                <>
                  <MainFooter />
                </>
              )
            })
          })}
        </LayoutMain>
      </TransformBoxProvider>
      <LoginBtn />
      <BackTop />
    </div>
  )
}

export default Layout
