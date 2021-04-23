import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import '@/styles/index.less'
import { history } from './router'
import store from './store'
import App from './app'
ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
