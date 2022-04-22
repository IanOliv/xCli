
import { GluegunCommand } from 'gluegun'
import  input  from '../utils/stdin'

// dsdsd[ddd]

// import Types from '../utils/types'
import {generate} from '../utils/connect'
const command: GluegunCommand = {
  name: 'connect',
  alias: ['cc'],
  description: `Connects to a realtime API (WS,Socket.io) ${''
    } \n options:${ ''
    } \n \t --host <url>${ ''
    } \n \t --lib  <lib> [ socket.io , ws ]
  `,
  
  run: async toolbox => {
    const {  print, parameters,system} = toolbox
    const {host,lib,logger}=parameters.options
    const socket = generate({ host }, { print, lib, system ,logger})
    input((chunk)=>{
        if(chunk.message){
            // @ts-ignore
            socket.emit('message',chunk.message)
        }
        if(chunk.event){
            // @ts-ignore
            socket.emit(chunk.event,chunk.data)
        }
        console.log(chunk)
        socket.emit(chunk)

        
    }) 

  },
}

module.exports = command
