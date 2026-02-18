import React from "react"
import useUser from "~/stores/users"
import { type IServer, Header, DashboardServers } from "~/views"

const mockServers: IServer[] = [
  { name: "Prod-East-1", username: "admin", lastLoggedIn: "2026-02-18 09:12", status: "online" },
  { name: "Prod-West-1", username: "admin", lastLoggedIn: "2026-02-18 08:45", status: "online" },
  { name: "Staging", username: "dev", lastLoggedIn: "2026-02-17 16:30", status: "offline" },
  { name: "QA-Server", username: "qa-bot", lastLoggedIn: "2026-02-16 12:00", status: "unknown" },
  { name: "Dev-Local", username: "developer", lastLoggedIn: "2026-02-18 10:05", status: "online" },
]

export const Dashboard: React.FC = () => {
  const name = useUser((state) => state.name)

  return (
    <div className="min-h-screen">
      <Header name={name} />
      <main className="flex items-center justify-center pt-8 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <div className="max-w-[900px] w-full space-y-6 px-4">
            <DashboardServers servers={mockServers} />
          </div>
        </div>
      </main>
    </div>
  )
}


