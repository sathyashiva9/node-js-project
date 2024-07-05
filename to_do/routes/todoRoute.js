const express = require("express");
const TodoList = require("../models/todoModel");
const router = express.Router();



router.get("/allTodos", async (req,res) => {
    try {
        let allTodos = await TodoList.find();
        res.json(allTodos);
    } catch(error) {
        console.log("Error message: ",error.message);
        throw new Error("Error can't get allTodos");
    }
})


router.get("/", async (req,res) => {
    try {
        // let today = new Date().toISOString().split("T")[0];
        let today = new Date();
        const all = await TodoList.find();

        const overDue = await TodoList.find({ dueDate: {$lt: today},completed:false});
        const dueToday = await TodoList.find({ dueDate: today,completed:false});
        const dueLater = await TodoList.find({ dueDate: {$gt: today},completed:false});
        const completedItem = await TodoList.find({completed: true})
        const result="overDue\n"+overDue+"\ndueToday\n"+dueToday+"\ndueLater\n"+dueLater+"\nCompleted Item"+completedItem;
        res.end(result);
    } catch(error) {
        console.log("There is an error\n",error);
        throw new Error("Could not get");
    }
   
});

router.post("/", async (req,res) => {
    try{
        const todo = req.body;
        const newTodo = await TodoList.create({"title":req.body.title,"dueDate":req.body.dueDate,"completed":false});
        // return res.json({ id: newTodo._id });
        return res.redirect("/");
    } catch(error){
        console.log("There is an error\n",error);
        throw new Error("Could not post");
    }
    
});

router.get("/:id", async (req,res) => {
    try {
        const todo = await TodoList.find({ _id: req.params.id});
        if(!todo){
            res.json({ message: "No item found" });
        }
        res.json(todo);
    } catch(error) {
        console.log("An error has occurred",error);
        throw new Error("Error, Unable to get");
    }
})

// router.put("/:id", async (req,res) => {
//     try {
//         const todo = await TodoList.findById(req.params.id);
//         if(!todo){
//             res.json({ message: "No item found " });
//         }
//         await TodoList.findByIdAndUpdate({ _id:req.params.id },req.body);
//         res.json({ message: `${req.params.id} is updated`});
//     } catch(error) {
//         console.log("error has occurred",error);
//         throw new Error("Cannot update the data");
//     }
// })

router.put("/:id/markAsCompleted", async (req,res) => {
    try {
        const todo = await TodoList.findById(req.params.id);
        if(!todo){
            res.json({ message: "No item found" });
        }
        // console.log(todo)
        const status = todo.completed ? true : false;
        await TodoList.findByIdAndUpdate({ _id:req.params.id },{completed:status});
        return res.redirect("/");
        res.json({ message: `${req.params.id} is updated`});
    } catch(error) {
        console.log("error has occurred",error);
         throw new Error("Cannot update the data");
    }
})
router.delete("/:id", async (req,res) => {
    try {
        const todo = await TodoList.findById(req.params.id);
        if(!todo){
            res.json({ message: "No item found " });
       }
       await TodoList.findByIdAndDelete(req.params.id);
       res.json({ message: `${req.params.id} is deleted`});
    } catch(error) {
        console.log("error has occurred now",error);
        throw new Error("Cannot delete the data");
    }
})
// router.get()


module.exports = router;