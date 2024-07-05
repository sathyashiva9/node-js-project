const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const getGoals = async (req,res) => {
    try{
        const goals = await Goal.find({user: req.user.id});
        res.status(200).json(goals);
    } catch(err){
        res.status(500).json({message:err.message});
    }
    
}

const setGoal = async (req,res) => {
    // console.log(req.body.key1);
    try{
        if(!req.body.text){
            res.status(400);
            throw new Error("Please add a text field");
        }
    
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.json({ message: 'goal is set.' });
    } catch(err){
        res.status(500).json({message:err.message});
    }
    
}

const updateGoal = async (req,res) => {
    try{
        const goal = await Goal.findById(req.params.id);
        if(!goal){
            res.status(400);
            throw new Error("goal not found");
    }
        const user = await User.findById(req.user.id);
        if(!user) { 
            //Checkinf For te User
            res.status(401);
            throw new Error("User not found");
        }
        //Make sure the login user matches the user of the goal
        if(goal.user.toString() !== user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
        res.json({ message: updatedGoal });
    } catch(err){
        res.status(500).json({message:err.message});
    }
    
}

const deleteGoal = async (req,res) => {
    try{
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if(!goal){
            res.status(400);
            throw new Error("goal not found");
    }
    const user = await User.findById(req.user.id);
    if(!user) { 
        //Checkinf For te User
        res.status(401);
        throw new Error("User not found");
    }
    //Make sure the login user matches the user of the goal
    if(goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
        // await goal.remove(); Not working.
        // const goals = await Goal.find();
        // const newGoals = goals.map()        
        res.json({ id: req.params.id });
    } catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
    
}




module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}