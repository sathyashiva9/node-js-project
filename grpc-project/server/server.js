const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./proto/user.proto');
const definition = grpc.loadPackageDefinition(packageDefinition);
const UserService = definition.UserService.service;



const users = [{
    id : 1,
    name: "Shiva",
    age: 22,
    email: "s@gmail.com"
}];

function addUser(call, callback) {
    const data = call.request;
    const user = { ...data, id: users.length+1 };
    users.push(user);
    return callback(null, user);
}

function getUsers(call, callback) {
    console.log(users)
    return callback(null, { users });
}




const server = new grpc.Server();
server.addService(UserService, {
    addUser,
    getUsers
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure() ,() => {
    // server.start();
    console.log("Listening to port 50051")
});