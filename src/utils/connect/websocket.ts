import { iContent, iParams } from '@base/@types';
import  { WebSocket} from 'ws';
import { Connection, IStatus } from './connection';
import autobind from '../decorators/autobind'
import { ConnectionStatus, getValueFrom } from '../types/status';
import logger from '../debug/logger';
export  default class WebSocketConnection extends Connection {
  status: IStatus
  ws: WebSocket
  retry: boolean = true
  constructor(content: iContent, params: iParams) {
    super(content, params)
    const { print } = params
    const { host } = content
    this.status = {
      connected: false,
      spinner: print.spin(getValueFrom(ConnectionStatus.CONNECTING)),
    }
    this.connecting()
    const ws = new WebSocket(host)
    ws.on('open', this.connected)
    // function open() {
    //   this.spinner.succeed('Connected!')
    //   this.spinner.stop()
    // })
    ws.on('message', this.onEvents)
    //  function incoming(message: Buffer) {
    //   console.log(message.toString())
    //   console.log(message.toString('utf8'))
    //   console.log(message.toString('utf8', 0, message.length))
    //   console.log(message)
    //   console.log(arguments)
    // })

    ws.on('error', this.error)
    ws.on('close', this.disconnected)
    this.ws = ws
    // function incoming(message: Buffer) {
    //   this.spinner.fail(` ${message.toString()}`)
    // })
  }
  @autobind
  emit(...args: any[]): void {
    this.ws.send(args[0])
  }
  @autobind
  connecting(): void {
    this.status.connected = false
    this.status.spinner.start(getValueFrom(ConnectionStatus.CONNECTING))
  }
  @autobind
  connected(): void {
    console.log('On Connected')
    this.status.spinner.succeed(getValueFrom(ConnectionStatus.CONNECTED))
    this.status.spinner.stop()
    this.status.connected = true
  }
  @autobind
  disconnected(): void {
    this.status.spinner.fail(getValueFrom(ConnectionStatus.DISCONNECTED))
    this.status.connected = false
    if (this.retry) {
      this.status.spinner.start(getValueFrom(ConnectionStatus.RECONNECTING))
    } else {
      process.exit(1)
    }
  }

  @autobind
  onEvents(...args: any[]): void {
    console.log(args.toString())
    logger({ data: args.toString() })
    console.log('On Events')
  }
  error(): void {
    console.log('On Error')
  }
}