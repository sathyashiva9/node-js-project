const sayHello = () => {
    console.log("Saying Hello!");
    a=1000;
    return ;
}
let a=100;
sayHello();
//One approach
// module.exports.sayHello = () => {
//     console.log("Saying Hello!");
// }

//If only one we want to export. Mostly used to export any functions.
// module.exports = sayHello;

module.exports = {sayHello};
// console.log(module);
