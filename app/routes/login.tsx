import type {Route} from "./+types/login"
import { Login } from "~/pages"
import { NonAuthenticatedUserRoute } from "~/routes/NonAuthenticatedUserRoute"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login - Mirth Manager" },
    { name: "description", content: "Login to Mirth Manager" },
  ];
}

export default function LoginRoute() {
  return (
    <NonAuthenticatedUserRoute>
      <Login />
    </NonAuthenticatedUserRoute>
  );
}
