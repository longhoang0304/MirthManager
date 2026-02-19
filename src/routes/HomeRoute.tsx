import { Redirect } from "wouter"
import useUser from "~/stores/users"

export default function HomeRoute() {
  const isLoggedIn = useUser((state) => state.isLoggedIn)

  return <Redirect to={isLoggedIn ? "/dashboard" : "/login"} />
}
