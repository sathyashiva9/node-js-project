const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path')
const packageDefinition = protoLoader.loadSync(path.join(__dirname,'../proto/location_server.proto'));
const definition = grpc.loadPackageDefinition(packageDefinition);


var client = new definition.messageService("0.0.0.0:50051",grpc.credentials.createInsecure())

exports.getMessageData = async()=>{
    return new Promise((resolve,reject)=>{
        client.sendData({},function(err,response){
            console.log(err,response)
            if (err){
                return reject(err)
            }
            console.log(response)
            return resolve(response)
        })
    })
}