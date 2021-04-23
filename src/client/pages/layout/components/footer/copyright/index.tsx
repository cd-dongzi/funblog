import React from 'react'
import './style.less'

type Props = unknown
interface Copyright {
  (props: Props): JSX.Element | null
}

const Copyright: Copyright = () => {
  return (
    <div className="copyright">
      <p>版权所有 © 2021 •̀.̫•́✧ | Wintermelon All Rights Reserved</p>
      <p className="code">京ICP备17004318号-1</p>
    </div>
  )
}

export default Copyright
