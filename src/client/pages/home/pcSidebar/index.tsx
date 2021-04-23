import React, { useEffect, useRef, useState } from 'react'
import { MenuButton, ButtonItem } from '@/components'
import { SidebarContainer, SidebarRef } from '@/appComponents'
import config from '@/config'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './style.less'

type Props = {
  sidebarRef: any
  onClick: (item: ButtonItem) => void
}
interface HomePcSidebar {
  (props: Props): JSX.Element | null
}
const HomePcSidebar: HomePcSidebar = ({ onClick, sidebarRef }) => {
  const blog = useSelector((state: IStoreState) => state.blog)
  const [menuIndex, setMenuIndex] = useState(0)
  const [navigationIndex, setNavigationIndex] = useState(-1)
  useEffect(() => {
    setMenuIndex(config.blogMenuList.findIndex((item) => item.name === blog.blogTag))
    setNavigationIndex(blog.blogTags.findIndex((item) => item.name === blog.blogTag))
  }, [blog.blogTag, blog.blogTags])
  return (
    <SidebarContainer className="home-pc-sidebar" contentClass="home-content" ref={sidebarRef}>
      <div className="container">
        <div className="core">
          <MenuButton
            type="raised"
            mode="vertical"
            current={menuIndex}
            list={config.blogMenuList}
            onClick={(current) => onClick(config.blogMenuList[current])}
          />
        </div>
        <div className="menus">
          <div className="menus-head">导航</div>
          <MenuButton
            type="raised"
            mode="vertical"
            current={navigationIndex}
            list={blog.blogTags}
            onClick={(current) => onClick(blog.blogTags[current])}
          />
        </div>
      </div>
    </SidebarContainer>
  )
}

export default HomePcSidebar
