console.log("This is "+__filename);//filename
console.log(__dirname+" is the current directory.");//directory name
//Importing module
//Thus is used if you directly equated the value like module.exports = sayHello
// const sayHello= require("./testing_module.js");
// sayHello();
//OR
//If you take an object like module.exports = {sayHello}
const otherModule = require("./testing_module.js");
otherModule.sayHello();
//To executea function directly
// require("./testing_module.js");//But this directly prints the function output if there is a function invoking stmt in the other file.
// console.log(a);//This giving an err.I think variables are not imported if we write only require stmt.
// console.log(a);//This time, I have defined these variables in the function, still I am getting the error.


