// const http = require('http');
// const server = http.createServer((req,res)=>{
//     // console.log("server is running");
//     // res.end("Hello Im server");
//     res.writeHead(200,{'content-type':'text/plain'});
//     res.write('Hello');
//     res.end();
// })
// server.listen(5000);

//IN EXPRSS

const express = require('express');
const app= express();
app.get("/",(req,res)=>{
    console.log(req.user);
    
    res.send("hello");
})
app.get("/hello",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.all("*",(req,res)=>{
    res.status(404).send("resource not found");
})
app.listen(5000,()=>{
    console.log("server listening on port 5000");
})