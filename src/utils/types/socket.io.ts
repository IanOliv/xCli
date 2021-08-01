import { io }  from 'socket.io-client'
import * as colors from 'colors'


export default function({host},{print}){
    const spinner=print.spin('connection')
    let isConnected=false
    const socket =io(host)
    socket.onAny((eventName, ...args) => {
        if(!isConnected){
            spinner.succeed('Connected!')
            spinner.stop()
            isConnected=true
        }
        spinner
        .stopAndPersist({ symbol: '📥', text: colors.inverse(' [ '+eventName+' ] '+' '+args+' ') })
    });

   
    return {emit:(...args)=>{
        const [event,data]= args
        socket.emit(event,data)
    }}

}