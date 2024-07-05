const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path')
const packageDefinition = protoLoader.loadSync(path.join(__dirname,'../proto/location_server.proto'));
const definition = grpc.loadPackageDefinition(packageDefinition);

const controller = require('../controller/locationController')

const sendData = async (call, callback) => {
    try{
        console.log("Request",call.request);
        let responce = await controller.get_data()
        console.log(responce)
        callback(null,{response:responce});
    } catch(error){
        callback(error,null)
    }   
}

module.exports = {
    definition: definition.messageService.service,
    methods: {
        sendData
    }
}