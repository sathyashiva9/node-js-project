const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path')
const packageDefinition = protoLoader.loadSync('./proto/user.proto');
const definition = grpc.loadPackageDefinition(packageDefinition);
const UserService = definition.UserService;



const client = new UserService("0.0.0.0:50051", grpc.credentials.createInsecure());

module.exports = client;
