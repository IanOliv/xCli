
import { GluegunCommand } from 'gluegun'
import  input  from '../utils/stdin'
import * as colors from 'colors'

import Types from '../utils/types'
const command: GluegunCommand = {
  name: 'connect',
  alias: ['cc'],
  description: `Connects to a realtime API (WS,Socket.io) ${
    ' '} \n options:${ ''
    } \n \t --host <url>${ ''
    } \n \t --lib  <lib> [ socket.io , ws ]
  `,
  run: async toolbox => {
    const {  print, parameters,system} = toolbox
    const {host,lib}=parameters.options
    const socket= Types({host},{print,lib,system})
    input((chunk)=>{
        if(chunk.message){
            console.log(colors.inverse(' you: ' ))
            // @ts-ignore
            socket.emit('message',chunk.message)
        }
        if(chunk.event){
            // @ts-ignore
            socket.emit(chunk.event,chunk.data)
        }
        if(lib==='ws'){
            // @ts-ignore
            socket.emit(chunk)
        }else{
            return 0
        }
        
        
    }) 

  },
}

module.exports = command
