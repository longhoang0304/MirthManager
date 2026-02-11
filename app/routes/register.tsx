import type {Route} from "./+types/register";
import {Register} from "~/pages";
import {NonAuthenticatedUserRoute} from "~/routes/NonAuthenticatedUserRoute"

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Register - Mirth Manager"},
    {name: "description", content: "Register for Mirth Manager"},
  ];
}

export default function RegisterRoute() {
  return (
    <NonAuthenticatedUserRoute>
      <Register/>
    </NonAuthenticatedUserRoute>
  );
}
