import type { ServerConfigModel } from './serverConfig.model'

export interface UserServerConfigModel extends ServerConfigModel {
  userId: number
}
