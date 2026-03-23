import React from 'react'
import useUser from '~/infras/zustard.infra/users.zustard'
import { Header, AddNewServer } from '~/views'

export const AddOrImportServer: React.FC = () => {
  const name = useUser((state) => state.name)

  return (
    <div className="min-h-screen">
      <Header name={name} />
      <main className="flex items-center justify-center pt-8 pb-4">
        <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
          <div className="w-full max-w-[900px] space-y-6 px-4">
            <AddNewServer />
          </div>
        </div>
      </main>
    </div>
  )
}
