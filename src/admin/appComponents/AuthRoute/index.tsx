import React, { useEffect, useState } from 'react'
import { Redirect, useLocation, useHistory } from 'react-router-dom'
import { LoadingPage } from '@/components'
import { Cookie } from '@/utils/cache'
import rootConfig from '@root/src/shared/config'
import api from '@/api'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { setUserState } from '@/store/user/action'
import { signOut } from '@/utils/app'

type Props = {
  Component: any
} & any
interface AuthRoute {
  (props: Props): JSX.Element | null
}

const AuthRoute: AuthRoute = ({ Component, ...props }) => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const user = useSelector((state: IStoreState) => state.user)
  const [loading, setLoading] = useState(!user._id && !isLoginPage)
  const token = Cookie.get(rootConfig.adminTokenKey)
  const dispatch = useDispatch()
  useEffect(() => {
    async function load() {
      if (token && !user._id) {
        try {
          setLoading(true)
          const { data } = await api.user.getUserInfoByToken()
          dispatch(
            setUserState({
              username: data.username,
              _id: data._id,
              roles: data.roles,
              github: data.github
            })
          )
          setLoading(false)
        } catch (e) {
          signOut()
        }
      }
    }
    load()
  }, [token, user._id, dispatch])
  if (loading && token) {
    return <LoadingPage />
  }
  if (token) {
    if (isLoginPage) {
      return <Redirect exact to="/" />
    }
    return <Component {...props} />
  } else {
    if (!isLoginPage) {
      return <Redirect exact to="/login" />
    } else {
      return <Component {...props} />
    }
  }
}

export default AuthRoute
