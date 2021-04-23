import React from 'react'
import classnames from 'classnames'
import Container, { Props } from '../container'
import './style.less'

interface TagStrip {
  // (props: Omit<Props, 'style'>): JSX.Element | null
  (props: Props): JSX.Element | null
}

const TagStrip: TagStrip = ({ children, className, ...rest }) => {
  // const style = {
  //   color: `var(--color_1)`
  // }
  return (
    <Container className={classnames('tag-strip', className)} {...rest}>
      {children}
    </Container>
  )
}

export default TagStrip
