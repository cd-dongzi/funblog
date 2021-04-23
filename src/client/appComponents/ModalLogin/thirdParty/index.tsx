import React, { useState } from 'react'
import config from '@/config'
import { Icon, Tooltip } from '@/components'
import rootConfig from '@root/src/shared/config'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { User } from '@root/src/models/user'
import './style.less'

type Props = {
  onSubmit: (user: Partial<User>) => void
}
interface ThirdParty {
  (props: Props): JSX.Element | null
}

const ThirdParty: ThirdParty = ({ onSubmit }) => {
  const [show, setShow] = useState(false)
  const onClick = (item: { name: string; icon: string }) => {
    const newWidth = 600
    const newHeight = 600
    const winWidth = screen.width
    const winHeight = screen.height
    const left = (winWidth - newWidth) / 2
    const top = (winHeight - newHeight) / 2
    const windowSize = `width=${newWidth},height=${newHeight},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no`
    console.log(left, top)
    if (item.name === 'Github') {
      const oauth = rootConfig.github.oauth
      const url = `${oauth.url}?client_id=${oauth.client_id}&redirect_uri=${encodeURIComponent(oauth.redirect_uri)}`
      window.open(url, 'GithubLogin', windowSize)
    } else if (item.name === 'QQ') {
      const oauth = rootConfig.qq.oauth
      const url = `${oauth.url}?response_type=code&client_id=${oauth.appId}&redirect_uri=${encodeURIComponent(
        oauth.redirect_uri
      )}&state=state`
      window.open(url, 'TencentLogin', windowSize)
    } else if (item.name === 'Google') {
      /* 
        // server授权，需代理
        // api.oauth.getUrlByGoogleOAuth().then((res) => {
        //   window.open(res.data)
        // })
      */
      window.gapi.load('auth2', () => {
        const authObj = window.gapi.auth2.init({
          client_id: rootConfig.google.oauth.client_id,
          scope: 'email profile openid',
          prompt: 'select_account'
        })
        authObj
          .signIn()
          .then((obj: any) => {
            // const userInfo = obj.Es
            const userInfo = obj.Is
            onSubmit({
              email: userInfo.kt,
              name: userInfo.sd
            })
          })
          .catch(() => null)
      })
    }
  }
  return (
    <div className="third-party-wrapper">
      <p
        className={classnames('tp-expand', {
          hide: show
        })}
        onClick={() => setShow(!show)}
      >
        第三方登录
      </p>
      <CSSTransition
        in={show}
        appear
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames="tp-list"
        unmountOnExit
      >
        <div className="df-c tp-list">
          {config.thirdPartyList.map((item) => (
            <Tooltip content={item.name} key={item.name}>
              <div className="tp-item df-c" onClick={() => onClick(item)}>
                <Icon name={item.icon} />
              </div>
            </Tooltip>
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}

export default ThirdParty
