import React from "react"
import { Navigate } from "react-router"
import useUser from "~/stores/users"

export const AuthenticatedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useUser((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
