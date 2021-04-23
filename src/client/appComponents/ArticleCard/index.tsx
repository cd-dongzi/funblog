import React from 'react'
import { Github, Icon } from '@/components'
import { BlogSub } from '@root/src/models/blog'
import './style.less'

type Props = {
  item: BlogSub
}
interface HomeArticleCard {
  (props: Props): JSX.Element | null
}

const HomeArticleCard: HomeArticleCard = ({ item }) => {
  return (
    <section className="article-card">
      <div className="box">
        <Github className="github" path={item.github} />
        <h2>{item.title}</h2>
        <time>{item.updateTime}</time>
        <div className="desc">
          {item.desc}
          <span className="look-more">查看更多</span>
        </div>
        <div className="comment">
          <div className="bubble">
            <Icon name="bubble" />
            <span>{item.comment_nums}</span>
          </div>
          <div className="reply">回复</div>
        </div>
        {/* <ul class="tags">
          <li :key="tag" v-for="tag in item.type">
            <Tag :title="tag" :path="`/blog/${tag}`" :color="getColor(tag)"></Tag>
          </li>
        </ul> */}
      </div>
    </section>
  )
}

export default HomeArticleCard
