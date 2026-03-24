export type ServerConfigType = 'json' | 'xml'

export interface ServerConfigModel {
  id?: number
  serverConfig: string
  configType: ServerConfigType
  currentBranch: string
  parentBranch?: string
  commitMessage?: string
  commitHash?: string
  prevCommitHash?: string
  nextCommitHash?: string
  createdAt: Date
  // no updated at because we use commit hash as version
}
