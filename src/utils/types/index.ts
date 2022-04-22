import { iParams } from "../../@types";
import socketIo from "../connect/socket.io";
import websocket from "../connect/websocket";

export default function(content,params:iParams){
    const {lib}=params
    switch (lib) {
        case 'socket.io':
            return new socketIo(content,{...params})
        case 'ws':
            return new websocket(content,params)            
        default:
            throw new Error('the lib params needs a values')
        ;
    }
}
