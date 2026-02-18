import React, { useState, useMemo } from "react"
import { Link } from "react-router"
import { ServerList } from "./ServerList"
import type { IServer } from "./ServerList"

type SortKey = "name" | "lastLoggedIn" | "status"
type SortDir = "asc" | "desc"

interface ISortOption {
  key: SortKey
  dir: SortDir
  label: string
}

interface IDashboardServersProps {
  servers: IServer[]
}

const sortOptions: ISortOption[] = [
  { key: "name", dir: "asc", label: "Name (A → Z)" },
  { key: "name", dir: "desc", label: "Name (Z → A)" },
  { key: "lastLoggedIn", dir: "desc", label: "Last Logged In (Newest)" },
  { key: "lastLoggedIn", dir: "asc", label: "Last Logged In (Oldest)" },
  { key: "status", dir: "asc", label: "Status (Online first)" },
  { key: "status", dir: "desc", label: "Status (Offline first)" },
]

const statusOrder: Record<string, number> = {
  online: 0,
  offline: 1,
  unknown: 2,
}

export const DashboardServers: React.FC<IDashboardServersProps> = ({ servers }) => {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current = sortOptions[selectedIdx]

  const sorted = useMemo(() => {
    const dir = current.dir === "asc" ? 1 : -1
    return [...servers].sort((a, b) => {
      if (current.key === "name") return a.name.localeCompare(b.name) * dir
      if (current.key === "lastLoggedIn") return a.lastLoggedIn.localeCompare(b.lastLoggedIn) * dir
      return ((statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3)) * dir
    })
  }, [servers, current])

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Servers
        </h2>

        {/* Sort dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="btn btn-ghost btn-sm"
          >
            {/* Sort icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 000 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
            Sort: {current.label}
          </button>

          {open && (
            <ul className="menu dropdown-content absolute right-0 mt-2 w-56 rounded-xl border border-base-300 bg-base-100 shadow-lg z-50">
              {sortOptions.map((opt, idx) => (
                <li key={`${opt.key}-${opt.dir}`}>
                  <button
                    onClick={() => {
                      setSelectedIdx(idx)
                      setOpen(false)
                    }}
                    className={selectedIdx === idx ? "active" : ""}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Link to="/add-server" className="block mb-4">
        <div className="card card-border card-dash p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-200 hover:border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-base-content/40"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-base-content/60">
            Add new server
          </span>
        </div>
      </Link>

      <ServerList servers={sorted} />
    </section>
  )
}
