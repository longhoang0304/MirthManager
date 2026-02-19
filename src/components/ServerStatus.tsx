import React from "react"

export type ServerStatusType = "online" | "offline" | "unknown"

interface IServerStatusProps {
  name: string
  username: string
  lastLoggedIn: string
  status: ServerStatusType
}

const statusColors: Record<ServerStatusType, string> = {
  online: "status-success",
  offline: "status-error",
  unknown: "status-neutral",
}

export const ServerStatus: React.FC<IServerStatusProps> = ({
  name,
  username,
  lastLoggedIn,
  status,
}) => {
  return (
    <div className="card card-border p-4 space-y-1 transition-colors duration-200 hover:border-primary cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
        <span
          className={`status  ${statusColors[status]}`}
          title={status}
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{username}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500">
        Last logged in: {lastLoggedIn}
      </p>
    </div>
  )
}
