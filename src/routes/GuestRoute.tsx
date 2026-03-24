import React from 'react'
import { Redirect, Route, type RouteProps } from 'wouter'
import useUser from '~/infras/zustard.infra/user.zustard'

export const GuestRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const isLoggedIn = useUser((state) => state.isLoggedIn)

  return <Route {...props}>{isLoggedIn ? <Redirect to="/" /> : children}</Route>
}
