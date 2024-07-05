const {createReadStream} = require('fs');
//,{highWaterMark:90000}
const stream = createReadStream('./dir1/dir2/test.txt',{encoding:'utf-8'});
stream.on('data',(result)=>{
    console.log(result);
})
stream.on('error',(err)=>{
    console.log(err);
})
//If streams are not used then reading the entire data and sending it through some network is always a big issue. Huge size is difficult to send.


var http = require('http');
const server = http.createServer((req,res)=>{
    const stream2 = createReadStream('./dir1/dir2/test.txt',{encoding:'utf-8'});
stream2.on('open',()=>{
    stream2.pipe(res);
})
//converting the response object to a writable stream.
stream2.on('error',(err)=>{
    res.end(err);
})
})

server.listen(5000);