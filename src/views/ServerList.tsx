import React from "react"
import { Link } from "wouter"
import { ServerStatus, type ServerStatusType } from "~/components"

export interface IServer {
  id: string
  name: string
  username: string
  lastLoggedIn: string
  status: ServerStatusType
}

interface IServerListProps {
  servers: IServer[]
}

export const ServerList: React.FC<IServerListProps> = ({ servers }) => {
  if (!servers.length) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No servers available.
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {servers.map((server) => (
        <Link key={server.id} to={`/server/${server.id}/details`}>
          <ServerStatus
            name={server.name}
            username={server.username}
            lastLoggedIn={server.lastLoggedIn}
            status={server.status}
          />
        </Link>
      ))}
    </div>
  )
}

