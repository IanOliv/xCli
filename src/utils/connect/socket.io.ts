import { io, Socket } from 'socket.io-client'
import {  iContent, iParams } from 'src/@types'
import autobind from "../decorators/autobind";
import { Connection, IStatus } from "./connection";
import { ConnectionStatus, getValueFrom } from '../types/status'
import  logger  from '../debug/logger'

// let event =(str:string)=>colors.green(colors.bgMagenta(str))




export  default class SocketIoConnection extends Connection {
  socket: Socket
  listOfEvents: any[]
  status: IStatus
  cb: Function
  retry: boolean = true
  constructor(content: iContent, params: iParams) {
    super(content, params)
    const { print, cb ,logger:hasLogger} = params
    const { host } = content
    this.cb = cb
    this.status = {
      connected: false,
      spinner: print.spin(getValueFrom(ConnectionStatus.CONNECTING)),
      logger:hasLogger
    }

    this.connecting()
    this.listOfEvents = []
    const socket = io(host)
    this.socket = socket
    this.socket.on(ConnectionStatus.DISCONNECTED, this.disconnected)
    this.socket.onAny(this.onEvents)
  }
  emit(eventName: string, data: string): void {
    this.socket.emit(eventName, data)
  }
  @autobind
  connecting(): void {
    this.status.connected = false
    this.status.spinner.start(getValueFrom(ConnectionStatus.CONNECTING))
  }
  @autobind
  connected(): void {
    this.status.spinner.succeed(getValueFrom(ConnectionStatus.CONNECTED))
    this.status.spinner.stop()
    this.status.connected = true
  }
  @autobind
  disconnected(): void {
    this.status.spinner.stop(getValueFrom(ConnectionStatus.DISCONNECTED))
    this.status.connected = false
    if (this.retry) {
      this.status.spinner.start(getValueFrom(ConnectionStatus.RECONNECTING))
    } else {
      process.exit(1)
    }
  }

  @autobind
  onEvents(eventName, ...args: any[]): void {


    if (!this.status.connected) {
      this.connected()
    }
    this.status.logger&&logger({ event: eventName, args })
    this.cb?.(eventName, ...args)
  }
  error(): void {
    
  }
}


