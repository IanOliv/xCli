import  SocketIoConnection  from "./socket.io";
import {  iContent, iParams } from "src/@types";
import { Connection } from "./connection";
import WebSocketConnection from "./websocket";


export function generate(content:iContent,params:iParams): Connection {
        const {lib} = params
        switch (lib) {
          case 'socket.io':
            return new SocketIoConnection(content, params) 
          case 'ws':
             return new WebSocketConnection(content,params) 
          default:
            throw new Error('typeConnection not found')
        }
}


export * from "./connection";

