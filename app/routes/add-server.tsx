import type { Route } from "./+types/add-server";
import { AddOrImportServer } from "~/pages";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Add Server - Mirth Manager" },
    { name: "description", content: "Add or import a server" },
  ];
}

export default function AddServerRoute() {
  return <AddOrImportServer />;
}
