
import { iContent, iParams } from 'src/@types'
export abstract class Connection {
  socket: any
  listOfEvents: Event[]
  status: IStatus
  constructor(content: iContent, params: iParams) {}
  abstract emit(...args: any[]): void
  abstract connecting(): void
  abstract connected(): void
  abstract error(): void
  abstract disconnected(): void
  abstract onEvents(...args: any[]): void
}


export interface IStatus {
  connected: boolean
  spinner: any
  logger?: boolean
}
