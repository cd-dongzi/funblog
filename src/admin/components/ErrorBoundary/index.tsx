import React from 'react'
import { withRouter } from 'react-router-dom'
import Sentry from '@/utils/sentry'

type Props = any
type State = {
  hasError: boolean
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // 你同样可以将错误日志上报给服务器
    this.props.history.push('/error')
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
