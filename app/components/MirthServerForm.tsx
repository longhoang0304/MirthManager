import React, { useCallback, useState } from "react"
import { TextInput } from "~/elements"

export interface IMirthServerFormData {
  name: string
  ip: string
  port: string
  username: string
  password: string
}

interface IMirthServerFormProps {
  onSave: (data: IMirthServerFormData) => void
  onConnect: (data: IMirthServerFormData) => void
}

const defaultFormData: IMirthServerFormData = {
  name: "",
  ip: "",
  port: "",
  username: "",
  password: "",
}



export const MirthServerForm: React.FC<IMirthServerFormProps> = ({
  onSave,
  onConnect,
}) => {
  const [formData, setFormData] = useState<IMirthServerFormData>(defaultFormData)

  const handleChange = useCallback(
    (field: keyof IMirthServerFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      },
    [],
  )

  const handleReset = useCallback(() => {
    setFormData(defaultFormData)
  }, [])

  const handleSave = useCallback(() => {
    onSave(formData)
  }, [formData, onSave])

  const handleConnect = useCallback(() => {
    onConnect(formData)
  }, [formData, onConnect])

  return (
    <div className="space-y-5">
      {/* Server Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="server-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Server Name
        </label>
        <TextInput
          id="server-name"
          type="text"
          placeholder="e.g. Production East"
          value={formData.name}
          onChange={handleChange("name")}
        />
      </div>

      {/* IP & Port */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-1.5">
          <label
            htmlFor="server-ip"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            IP Address
          </label>
          <TextInput
            id="server-ip"
            type="text"
            placeholder="e.g. 192.168.1.100"
            value={formData.ip}
            onChange={handleChange("ip")}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="server-port"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Port
          </label>
          <TextInput
            id="server-port"
            type="text"
            placeholder="8443"
            value={formData.port}
            onChange={handleChange("port")}
            required
          />
        </div>
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <label
          htmlFor="server-username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <TextInput
          id="server-username"
          type="text"
          placeholder="e.g. admin"
          value={formData.username}
          onChange={handleChange("username")}
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="server-password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <TextInput
          id="server-password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange("password")}
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          onClick={handleConnect}
        >
          Test connection
        </button>
      </div>
    </div>
  )
}
