import React, { useState } from 'react'
import classnames from 'classnames'
import { SidebarContainer } from '@/appComponents'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './style.less'

type Props = {
  onChange: (query: AnyObject) => void
  onResetContent?: () => void
}
interface ArchiveSidebar {
  (props: Props): JSX.Element | null
}
const ArchiveSidebar: ArchiveSidebar = ({ onChange, onResetContent }) => {
  const blog = useSelector((state: IStoreState) => state.blog)
  const [current, setCurrent] = useState(0)
  const onToggle = (index: number, year: string) => {
    setCurrent(index)
    if (year === '0') {
      onChange({ year })
    } else {
      // 动画完毕之后在更新
      const timer = setTimeout(() => {
        clearTimeout(timer)
        onResetContent && onResetContent()
      }, 600)
    }
  }
  const years = ['0', ...Object.keys(blog.archive.times).sort((a, b) => Number(b) - Number(a))]
  return (
    <div className="archive-sidebar">
      <div className="years">
        {years.map((year, index) => {
          const months = Number(year) ? [0, ...Object.values(blog.archive.times[year])] : []
          return (
            <div
              key={year}
              className={classnames('year', {
                'year-active': Number(blog.archive.year) === Number(year),
                expand: current === index
              })}
              onClick={() => onToggle(index, year)}
              style={{
                '--year_box_height': `${40 * months.length}px`
              }}
            >
              <div className="year-text">{Number(year) ? `${year} 年` : '全部'}</div>
              <div className="year-box">
                {[months[0], ...months.slice(1).sort((a, b) => Number(b) - Number(a))].map((month) => (
                  <div
                    key={`${year}${month}`}
                    className={classnames('month', {
                      'month-active': Number(blog.archive.year) === Number(year) && Number(blog.archive.month) === Number(month)
                    })}
                    onClick={() =>
                      onChange({
                        year,
                        month
                      })
                    }
                  >
                    {!month ? '全年' : `${month}月`}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArchiveSidebar
