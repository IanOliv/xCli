export default function(cb){
    process.stdin.resume();
    process.stdin.setEncoding("ascii");
    process.stdout.resume()
    process.stdout.setEncoding("ascii");
    process.stdin.on("data", function (chunk) {
        const nChunk =look(chunk)
        cb(nChunk)
    }); 
    process.stdin.on("close", function (chunk) {
        process.exit(1)
    });
    process.stdout.on("data", function (chunk) {
        const nChunk =look(chunk)
        cb(nChunk)
    });
    process.stdout.on("close", function (chunk) {
        process.exit(1)
    });
}

function look(chunk) {
    const clean =chunk.replace('\n','')
    const value =metadata(clean)
    if(value){
        return value
    }
    return clean
}

function metadata(chunk){
    try {
        const [content,name] =new RegExp(/\[(.*)\]/g)
        .exec(chunk)
        const data =chunk.replace(content,'')
        return {event:name,data:data}
    } catch (error) {
        return false
    }
        
    
}