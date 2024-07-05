//PATH-MODULE
const path = require('path');
console.log(path.sep);
const filePath = path.join('/dir1','dir2','test.txt');
console.log(filePath);
//Even if we give many slashes like this, this still works.
// const filePath = path.join('/dir1/','dir2','/test.txt');
// console.log(filePath);
//This prints test.txt name.
const base = path.basename(filePath);//test.txt
console.log(base);

//Absolute  path
const absolutePath = path.resolve(__dirname,'dir1','dir2','test.txt');
console.log("Absolute path is:",absolutePath);


//FS_MODULE
//SYNC
const {readFileSync, writeFileSync} = require('fs');
const file1 = readFileSync("./dir1/dir2/test.txt","utf8");
//flag="a" appends the content. Remove it to only override.
writeFileSync('./dir1/dir2/new_test.txt',`${file1}`,{flag:"a"});

//ASYNC
// let res;
const {readFile,writeFile} = require("fs");
readFile("./dir1/dir2/test.txt",'utf8',(err,result)=>{
    if(err){
        console.log(err);
        return ;
    }
    console.log(result);
    writeFile("./dir1/dir2/new_file.txt",`${result}`,(err,result)=>{
        if(err){
            console.log(err);
            return ;
        }
        console.log(result);
    }) ;
})

//In sync, the steps happen one after the other. But in the async the tasks happen like whichever requires time they executes like in backend and till then the other tasks are executed.
// Use async/await to make some operations wait.