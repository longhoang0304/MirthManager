export type ConnectionStatus = 'Unknown' | 'Connected' | 'Disconnected'

export interface ServerModel {
  id?: number
  userId: number
  name: string
  host: string
  port: number
  username: string
  password?: string
  appliedServerConfigId?: number
  connectionStatus: ConnectionStatus
  connectionError?: string
  lastConnectionTime?: Date
  createdAt: Date
  updatedAt: Date
}
