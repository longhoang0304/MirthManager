import React from "react"
import useUser from "~/stores/users"
import { Header, AddNewServer } from "~/views"

export const AddOrImportServer: React.FC = () => {
  const name = useUser((state) => state.name)

  return (
    <div className="min-h-screen">
      <Header name={name} />
      <main className="flex items-center justify-center pt-8 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <div className="max-w-[900px] w-full space-y-6 px-4">
            <AddNewServer />
          </div>
        </div>
      </main>
    </div>
  )
}
