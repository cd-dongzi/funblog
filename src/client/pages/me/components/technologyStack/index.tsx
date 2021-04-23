import React from 'react'
import { ALink } from '@/components'
import config from '@/config'
import Card from '../card'
import './style.less'

// const Bar = ({ item }: { item: { name: string; url: string; rate: number } }) => {
//   return (
//     <div className="technology-stack-bar">
//       <div className="progress df-sb" style={{ width: `${item.rate}%` }}>
//         <div className="name">{item.name}</div>
//       </div>
//     </div>
//   )
// }

type Props = unknown
interface MeTechnologyStack {
  (props: Props): JSX.Element | null
}

const MeTechnologyStack: MeTechnologyStack = () => {
  return (
    <Card title="本站核心技术" className="me-technology-stack">
      本站为SSR项目，使用React+Koa+typescript进行开发
      {/* <ALink href="https://github.com/cd-dongzi/BlogSource" target="_blank">
        （Github项目地址）
      </ALink> */}
      {config.technologyList.map((item) => (
        <div className="technology-stack-bar" key={item.name}>
          <div className="progress df-sb" style={{ width: `${item.rate}%` }}>
            <div className="name">{item.name}</div>
            <div className="rate">{item.rate}%</div>
          </div>
        </div>
      ))}
    </Card>
  )
}

export default MeTechnologyStack
