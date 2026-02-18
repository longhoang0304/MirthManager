import React, { useState, useMemo } from "react"
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
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1 z-50">
              {sortOptions.map((opt, idx) => (
                <button
                  key={`${opt.key}-${opt.dir}`}
                  onClick={() => {
                    setSelectedIdx(idx)
                    setOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedIdx === idx
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ServerList servers={sorted} />
    </section>
  )
}
