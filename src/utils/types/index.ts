import socketIo from "./socket.io";
import websocket from "./websocket";


export default function(content,params){
    const {lib}=params
    switch (lib) {
        case 'socket.io':
            return socketIo(content,params)
        case 'ws':
            return websocket(content,params)            
        default:
            throw new Error('the lib params needs a values')
        ;
    }
}
