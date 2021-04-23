import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Pagination } from '@/components'
// import Pagination from './Pagination'
import theme from '@/theme'
import './style.less'

const A = ({ children }: any) => {
  return (
    <div>
      <div className="div1">{children}</div>
      <div className="div2">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { children: <div>qqqqq</div> })
        })}
      </div>
      <div>AAAA</div>
    </div>
  )
}

const Test = ({ children }: any) => {
  return (
    <div>
      <div>Test</div>
      {children}
    </div>
  )
}

const Demo = () => {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const history = useHistory()
  const onClick = () => {
    setCount((prev) => ++prev)
  }
  // if (count > 5) {
  //   throw 'error1111'
  // }
  const onChange = (page: number) => {
    console.log(page)
    setCurrentPage(page)
  }
  const onSetPageCount = (p: number) => {
    setCurrentPage(p)
  }
  const onColor = () => {
    console.log('color')
    const dom = document.querySelector('#style-variables')
    if (dom) {
      console.log(theme.dark)
      dom.innerHTML = `
      :root {${Object.keys(theme.dark)
        .map((key) => `${key}:${theme.dark[key]};`)
        .join('')}}
      `
    }
  }
  return (
    <div className="Demo" onClick={onClick}>
      <div className="box">
        <ul className="inner">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <h1>demo</h1>
      <button onClick={() => history.push('/404')}>go 404</button>
      <button onClick={() => history.push('/error')}>go error</button>
      <button onClick={onColor}>换肤</button>
      <button onClick={() => history.push('/')}>go Home</button>
      <div>
        {Array.from(new Array(20).keys()).map((p) => (
          <li key={p}>
            <button onClick={() => onSetPageCount(Number(p) + 1)}>{Number(p) + 1}</button>
          </li>
        ))}
      </div>
      <Pagination pageCount={9} currentPage={currentPage} onChange={onChange} />
      {/* <A>
        <Test />
      </A> */}
    </div>
  )
}

export default Demo
