export interface iParams {
  lib: 'socket.io' | 'ws'
  print: any
  system?: any
  cb?: Function
  logger?: boolean
}
export interface iContent {
  host: string
}

// export  abstract class Connection {
//   socket: any
//   listOfEvents: Event[] 
//   constructor(content: iContent, params: iParams)
//   emit(...args: any[]): void
//   private connecting(): void
//   private connected(): void
//   private disconnected(): void
//   private onEvents(...args: any[]): void
// }

export interface Event {
  eventName: string
  date: Date
  args: any[]
}
