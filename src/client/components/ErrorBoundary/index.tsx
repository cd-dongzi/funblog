import React from 'react'
import { withRouter } from 'react-router-dom'
// import Sentry from '@/utils/sentry'

type Props = any
type State = {
  hasError: boolean
  sentry: any
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, sentry: null }
  }
  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (this.state.sentry) {
      // 你同样可以将错误日志上报给服务器
      this.state.sentry.captureException(error)
      this.props.history.push('/error')
    }
    // Sentry.captureException(error)
    // this.props.history.push('/error')
  }

  componentDidMount() {
    import('@/utils/sentry').then(({ default: Sentry }) => {
      this.setState({
        sentry: Sentry
      })
    })
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
