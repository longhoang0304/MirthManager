import type { Route } from "./+types/home"
import { Navigate } from "react-router"
import useUser from "~/stores/users"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mirth Manager" },
    { name: "description", content: "Welcome to Mirth Manager!" },
  ];
}

export default function HomeRoute() {
  const isLoggedIn = useUser((state) => state.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return <Navigate to="/login" replace />
}
