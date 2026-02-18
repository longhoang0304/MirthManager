import React from "react"
import { useParams } from "react-router"
import { Header } from "~/views"

// TODO: replace with real data fetching
const mockServers: Record<string, string> = {
  "srv-001": "Prod-East-1",
  "srv-002": "Prod-West-1",
  "srv-003": "Staging",
  "srv-004": "QA-Server",
  "srv-005": "Dev-Local",
}

export const ServerDetail: React.FC = () => {
  const { serverId } = useParams<{ serverId: string }>()
  const serverName = mockServers[serverId ?? ""] ?? "Unknown Server"

  return (
    <div className="min-h-screen">
      <Header name="" />
      <main className="flex items-center justify-center pt-8 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <div className="max-w-[900px] w-full space-y-6 px-4">
            <div className="card card-border p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {serverName}
              </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
