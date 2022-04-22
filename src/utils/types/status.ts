
const statusToUser = {
  EN: {
    CONNECTED: 'Connected',
    CONNECTING: 'Connecting...',
    RECONNECTING: 'Reconnecting...',
    disconnect: 'Disconnected',
    ERROR: 'Error',
  },
}



export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  RECONNECTING = 'RECONNECTING',
  DISCONNECTED = 'disconnect',
  ERROR = 'ERROR',
}


export function getValueFrom(status: ConnectionStatus): string {
    return statusToUser['EN'][status]
}


