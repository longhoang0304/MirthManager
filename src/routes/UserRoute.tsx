import React from 'react'
import { Redirect, Route, type RouteProps } from 'wouter'
import useUser from '~/infras/zustard.infra/users.zustard'

export const UserRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const isLoggedIn = useUser((state) => state.isLoggedIn)

  return (
    <Route {...props}>{!isLoggedIn ? <Redirect to="/" /> : children}</Route>
  )
}
