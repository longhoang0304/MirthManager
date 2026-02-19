import React from "react"
import { MirthServerForm, type IMirthServerFormData } from "~/components"

export const AddNewServer: React.FC = () => {
  const handleSave = (data: IMirthServerFormData) => {
    console.log("Save", data)
  }

  const handleConnect = (data: IMirthServerFormData) => {
    console.log("Connect", data)
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Add New Server
      </h2>
      <div className="card card-border p-6">
        <MirthServerForm onSave={handleSave} onConnect={handleConnect} />
      </div>
    </section>
  )
}
