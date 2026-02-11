import type {Route} from "./+types/home"
import {Login} from "~/pages"
import { NonAuthenticatedUserRoute } from "~/routes/NonAuthenticatedUserRoute"

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Mirth Manager"},
    {name: "description", content: "Welcome to Mirth Manager!"},
  ];
}

export default function HomeRoute() {
  return (
    <NonAuthenticatedUserRoute>
      <Login/>
    </NonAuthenticatedUserRoute>
  );
}
