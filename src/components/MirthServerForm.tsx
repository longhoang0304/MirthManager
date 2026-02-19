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
        <label htmlFor="server-name" className="label">
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
          <label htmlFor="server-ip" className="label">
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
          <label htmlFor="server-port" className="label">
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
        <label htmlFor="server-username" className="label">
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
        <label htmlFor="server-password" className="label">
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
        <button type="button" className="btn btn-primary flex-1" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="btn btn-ghost flex-1" onClick={handleReset}>
          Reset
        </button>
        <button type="button" className="btn btn-success flex-1" onClick={handleConnect}>
          Test connection
        </button>
      </div>
    </div>
  )
}
