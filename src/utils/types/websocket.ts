import * as WebSocket from 'ws';


export default  function({host},{print,system}){
    const spinner=print.spin('connection')
    const ws = new WebSocket(host);
    ws.on('open', function open() {
        spinner.succeed('Connected!')
        spinner.stop()
        
    });

    ws.on('message', function incoming(message:Buffer) {
        spinner.stopAndPersist({ symbol: '📥', text: ` ${message.toString()}` })
    });

    ws.on('error', function incoming(message:Buffer) {
        spinner.fail(` ${message.toString()}`)
    });

    return {emit:(...args)=>{
        const [content]=args
        ws.send(content)
    }}
    
}

