import React, { useState, useRef, useEffect } from "react"

interface IHeaderProps {
  name: string
}

export const Header: React.FC<IHeaderProps> = ({ name }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const menuItems = [
    { label: "Organization Settings", onClick: () => { } },
    { label: "User Settings", onClick: () => { } },
    { label: "Logout", onClick: () => { }, danger: true },
  ]

  return (
    <header className="navbar border-b border-base-300 px-6">
      <div className="navbar-start">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Welcome, {name}
        </h1>
      </div>

      {/* Settings dropdown */}
      <div className="navbar-end">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="btn btn-ghost btn-sm"
          >
            {/* Gear icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.062 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </button>

          {open && (
            <ul className="menu dropdown-content absolute right-0 mt-2 w-52 rounded-xl border border-base-300 bg-base-100 shadow-lg z-50">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      item.onClick()
                      setOpen(false)
                    }}
                    className={item.danger ? "text-error" : ""}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}
