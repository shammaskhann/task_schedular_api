const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://shammascsgo0312:shammas0312@cluster0.xfxgqux.mongodb.net/?retryWrites=true&w=majority";
const userMongo = require("./models/user.js");

app.use(express.json()); // middleware to parse json data

app.listen(8080, () => {
    console.log("Server is running...");
    console.log("http://localhost:8080");
});
mongoose.connect(dbUrl).then((res) => console.log("Connected to DB")).catch((err) => console.log(err));

app.get("/",(req,res)=>{
    res.send("Welcome to ExpressXmongoDB");
});

app.get("/user", async (req,res)=>{
    try{
        const user = await userMongo.find();
        res.json(user);
    }catch (error){
        console.log(error), res.send("Something went wrong"+error);
    }
    //short method
    //userMongo.find().then((users)=> res.json(users)).catch((err)=> console.log(err));
});

app.get("/user/:id" ,async(req,res)=>{
    try{
        const user = await userMongo.findById(req.params.id);
        res.json(user);
    }catch (error){
        console.log(error), res.send("Something went wrong"+error);
    }
    //short
    //userMongo.findById(req.params.id).then((user)=> res.json(user)).catch((err)=> console.log(err));
});

app.get("/user/:id/tasks",async(req,res)=>{
    try{
        const user = await userMongo.findById(req.params.id);
        res.json(user.tasks);
    }catch (error){
        console.log(error), res.send("Something went wrong"+error);
    }
    //short
    //userMongo.findById(req.params.id).then((user)=> res.json(user.tasks)).catch((err)=> console.log(err));
});

app.post('/user', async (req,res)=>{
    // addUser(req.body);
    console.log(req.body);  
    
    // res.json(users);
    try{
        const user = await userMongo.create(req.body);
        res.json(user);
    } catch (error){
        console.log(error), res.send("Something went wrong"+error);
    }
}
);

app.put("/user/:id",async(req,res)=>{
    try{ const user = await userMongo.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }, { new: true })
    res.json(user);
}catch(error){
        console.log(error), res.send("Something went wrong"+error);
    }   
});

// app.put("/user/:id/tasks",async(req,res)=>{
//     try{ const user = await userMongo.findByIdAndUpdate(req.params.id,{
//         tasks:req.body.tasks,
//     }, { new: true })
//     res.json(user);
// }
// catch(error){
//         console.log(error), res.send("Something went wrong"+error);
//     }
// }
// );
// app.put("/user/:id/tasks", async (req, res) => {
//     try {
//         const user = await userMongo.findByIdAndUpdate(
//             req.params.id,
//             { $push: { tasks: { $each: req.body.tasks } } },
//             { new: true }
//         );
//         res.json(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Something went wrong: " + error);
//     }
// });
app.put("/user/:id/tasks", async (req, res) => {
    try {
        const user = await userMongo.findByIdAndUpdate(
            req.params.id,
            { $push: { tasks: req.body } },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong: " + error);
    }
});

app.patch("/user/:id",async(req,res)=>{
    
    try{ const user = await userMongo.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
    }, { new: true })
    res.json(user);
}
catch(error){
        console.log(error), res.send("Something went wrong"+error);
    }
}
);

app.delete("/user/:id",async (req,res)=>{
    try{
        const user = await userMongo.findByIdAndDelete(req.params.id);
        // res.json(user);
        res.send("User deleted");
    }catch(error){
        console.log(error), res.send("Something went wrong"+error);
    }
    //userMongo.findByIdAndDelete(req.params.id).then((user)=> res.json(user)).catch((err)=> console.log(err));
});
//var users = [];
module.exports = app;