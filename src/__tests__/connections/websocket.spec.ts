import { ConnectionStatus, getValueFrom } from "@base/utils/types/status";
import { iContent, iParams } from "@types";
import { generate  } from "@utils/connect";
// import  { MockEventsWS } from '../helpers/mock'

let mockEvent={
  emit:(...args)=>{}
}

jest.mock(
  'ws',
  jest.fn(()=>{
    return  class Teste {
      constructor(...args){}
    }
  })
  
)

function serverActions(){
  mockEvent.emit("Hellloooo")
  
}


// function serverDisconnect(){
//    mockEvent.emit(ConnectionStatus.DISCONNECTED, 'connection')
//    // mockEvent.emit('workspace',"connection")
// }




function sut() {  
  const content: iContent 
  = {
    host: 'ws://localhost:3000',
  }
  const params = {
    lib: 'ws',
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


describe('WebSocket ', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should receive a event on the general namespace and set the flag connected', (done)=>{

        const ioMock= require('ws')
        console.log(ioMock)
        const {content,params}=sut()

        console.log(ioMock)
        const conn = generate(content,{...params})
        console.log(conn)
        const printSpy = jest.spyOn(params.print, 'spin')
        console.log(printSpy)
        console.log(printSpy.mock.results[0].value)

        const startSpinSpy = jest.spyOn(printSpy.mock.results[0].value, 'start')
        const succeedSpy = jest.spyOn(printSpy.mock.results[0].value, 'succeed')
        // const stopSpy = jest.spyOn(printSpy.mock.results[0].value, 'stop')

        serverActions()

        expect(printSpy).toHaveBeenCalled()
        expect(printSpy).toHaveBeenCalledWith(getValueFrom(ConnectionStatus.CONNECTING))
        expect(startSpinSpy).toHaveBeenCalled()
        expect(succeedSpy).toHaveBeenCalled()
        // expect(stopSpy).toHaveBeenCalled()
        expect(conn.status.connected).toBe(true)

    });

    // test('should call the event of disconnect',()=>{
    
    //     const {content,params}=sut()

    //     const conn = generate(content,{...params})
    //     serverDisconnect()        
        
    //    expect(conn.status.connected).toBe(false)

    // })
    // test('should receive a event on disconnect event', () => {
    //       const { content, params } = sut()
    //       const conn = generate(content, {
    //         ...params,
    //       })

    //       const printSpy = jest.spyOn(params.print, 'spin')
    //       const startSpinSpy = jest.spyOn(
    //         printSpy.mock.results[0].value,
    //         'start'
    //       )
    //       const succeedSpy = jest.spyOn(
    //         printSpy.mock.results[0].value,
    //         'succeed'
    //       )
    //       const stopSpy = jest.spyOn(printSpy.mock.results[0].value, 'stop')

    //       serverDisconnect()

    //       expect(printSpy).toHaveBeenCalled()
    //       expect(printSpy).toHaveBeenCalledWith(
    //         getValueFrom(ConnectionStatus.CONNECTING)
    //       )
    //       expect(startSpinSpy).toHaveBeenCalled()
    //       expect(succeedSpy).toHaveBeenCalled()
    //       expect(stopSpy).toHaveBeenCalled()
    //       expect(conn.status.connected).toBe(false)
    //       // jest.resetAllMocks()
    //     })

});
