import { ConnectionStatus, getValueFrom } from "@base/utils/types/status";
import { iContent, iParams } from "@types";
import { generate  } from "@utils/connect";
import mockEvent from "../helpers/mock";



jest.mock("socket.io-client", () => {


  return {
    io: jest.fn(() => mockEvent),
  }

})

function serverActions(){
  mockEvent.emit('workspace',"connection")
  
}


function serverDisconnect(){
   mockEvent.emit(ConnectionStatus.DISCONNECTED, 'connection')
   // mockEvent.emit('workspace',"connection")
}




function sut() {  
  const content: iContent 
  = {
    host: 'http://localhost:3000',
  }
  const params = {
    lib: 'socket.io',
    cb: jest.fn(() => {}),
    print: {
      spin: jest.fn(() => ({
        start: jest.fn(() => ({})),
        succeed: jest.fn(() => ({})),
        stop: jest.fn(() => ({})),
      })),
    },
  } as unknown as iParams

  return { content, params }
}


describe('SocketIo', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should recieve a event on the general namespace and set the flag connected', (done)=>{

        const ioMock= require('socket.io-client')
        const {content,params}=sut()


        const conn = generate(content,{...params,cb:()=>{done()}})
        
        const printSpy = jest.spyOn(params.print, 'spin')
        const startSpinSpy = jest.spyOn(printSpy.mock.results[0].value, 'start')
        const succeedSpy = jest.spyOn(printSpy.mock.results[0].value, 'succeed')
        const stopSpy = jest.spyOn(printSpy.mock.results[0].value, 'stop')

        serverActions()

        expect(ioMock.io).toHaveBeenCalledWith(content.host)
        expect(printSpy).toHaveBeenCalled()
        expect(printSpy).toHaveBeenCalledWith(getValueFrom(ConnectionStatus.CONNECTING))
        expect(startSpinSpy).toHaveBeenCalled()
        expect(succeedSpy).toHaveBeenCalled()
        expect(stopSpy).toHaveBeenCalled()
        expect(conn.status.connected).toBe(true)

    });

    test('should call the event of disconnect',()=>{
    
        const {content,params}=sut()

        const conn = generate(content,{...params})
        serverDisconnect()        
        
        expect(conn.status.connected).toBe(false)
        
      });
      
          test('should handle error events ',()=>{
          
        const {content,params}=sut()

        const conn = generate(content,{...params})
        serverDisconnect()        
        
       expect(conn.status.connected).toBe(false)

    });
});
