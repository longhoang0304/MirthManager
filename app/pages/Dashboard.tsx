import React from "react"
import useUser from "~/stores/users"

export const Dashboard: React.FC = () => {
  const name = useUser((state) => state.name)

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[400px] w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Welcome, {name}
            </h1>
          </div>
        </div>
      </div>
    </main>
  )
}
