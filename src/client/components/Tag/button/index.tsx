import React from 'react'
import classnames from 'classnames'
import Container, { Props } from '../container'
import './style.less'

interface TagButton {
  (props: Props): JSX.Element | null
}

const TagButton: TagButton = ({ children, className, ...rest }) => {
  return (
    <Container className={classnames('tag-button', className)} {...rest}>
      {children}
    </Container>
  )
}

export default TagButton
