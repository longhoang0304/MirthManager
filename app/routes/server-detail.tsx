import type { Route } from "./+types/server-detail";
import { ServerDetail } from "~/pages";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Server Details - Mirth Manager" },
    { name: "description", content: "Server Details" },
  ];
}

export default function ServerDetailRoute() {
  return <ServerDetail />;
}
