import * as colors from 'colors'
import {print  } from "gluegun";

let event = (val: string) => colors.green(colors.bgMagenta(val))
function getValueFrom(val) {
    if (typeof val === 'string' ){
        return event(val)
    }else{
        return JSON.stringify(val,null,'   ')
    }   
}



export default function logger(st) {
    print.divider()
    const keys = Object.keys(st)
    print.table([[...keys], [...keys.map((k) =>getValueFrom(st[k]))]], {
        format: 'lean',

        style: {
        compact: false,
        'padding-left': 0,
        'padding-right': 8,
        },
    })
    print.divider()
        
}