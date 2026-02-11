import type {Route} from "./+types/dashboard";
import {Dashboard} from "~/pages";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Dashboard - Mirth Manager"},
    {name: "description", content: "Mirth Manager Dashboard"},
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
