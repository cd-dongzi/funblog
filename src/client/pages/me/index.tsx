import React, { useEffect, useState } from 'react'
import { AppBanner, MobileContainer, HelmetBox } from '@/appComponents'
import { Github } from '@root/src/models/github'
import api from '@/api'
import Personal from './components/personal'
import Forum from './components/forum'
import TechnologyStack from './components/technologyStack'
import OpenSource from './components/openSource'
import './style.less'

const Me = () => {
  const [repos, setRepos] = useState<Github[]>([])
  useEffect(() => {
    async function load() {
      const { data } = await api.common.getReposByGithub()
      setRepos(data)
    }
    load()
  }, [])
  return (
    <MobileContainer>
      <div className="me-page">
        <HelmetBox title="关于我" keywords="陈冬,Wintermelon" />
        <AppBanner cover="https://img.dzblog.cn/images/me.jpg" title="关于我"></AppBanner>
        <div className="me-main">
          <Personal />
          <Forum />
          <TechnologyStack />
          {repos.length > 0 && <OpenSource list={repos} />}
        </div>
      </div>
    </MobileContainer>
  )
}

export default Me
