import { Route, Switch } from "wouter"
import { GuestRoute } from "./GuestRoute"
import { UserRoute } from "./UserRoute"
import HomeRoute from "./HomeRoute"
import { Login, Register, Dashboard, AddOrImportServer, ServerDetail } from "~/pages"

export default function MainRouter() {
  return (
    <Switch>
      <Route path="/" component={HomeRoute} />
      <GuestRoute path="/login">
        <Login />
      </GuestRoute>
      <GuestRoute path="/register">
        <Register />
      </GuestRoute>
      <UserRoute path="/dashboard">
        <Dashboard />
      </UserRoute>
      <UserRoute path="/add-server">
        <AddOrImportServer />
      </UserRoute>
      <UserRoute path="/servers/:id">
        <ServerDetail />
      </UserRoute>
      <Route>404 - Page Not Found</Route>
    </Switch>
  )
}
