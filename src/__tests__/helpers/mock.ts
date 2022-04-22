import { EventEmitter } from "events";


class MockEventsSIO {
    emitter: EventEmitter;

    constructor(smthing: any) {
        this.emitter = new EventEmitter();
    }
    on(eventName: string, cb: Function) {
        this.emitter.on(eventName, cb.bind(this));
    }   
    onAny(cb: Function) {
        this.emitter.on('workspace',cb.bind(this));
    } 
    emit(eventName: string, data: string) {
        this.emitter.emit(eventName, data);
    }
}


export class MockEventsWS {
    emitter: EventEmitter;

    constructor(smthing: any) {
        this.emitter = new EventEmitter();
    }
    on(eventName: string, cb: Function) {
        this.emitter.on(eventName, cb.bind(this));
    }   
    onAny(cb: Function) {
        this.emitter.on('workspace',cb.bind(this));
    } 
    emit( data: string) {
        this.emitter.emit("default", data);
    }
}




export default  new MockEventsSIO('');