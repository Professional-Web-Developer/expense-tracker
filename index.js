const express=require("express")
const mongoose=require('mongoose')
const app=express()
const port=process.env.PORT
const bodyParser = require('body-parser')
const Expense=require('./models/expenses')
mongoose.connect('mongodb+srv://kavin:kavin369@cluster0.jiykd7m.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology:true
})
app.use(express.json());
app.get('/expenses',async(req,res)=>{
    const expenses=await Expense.find();
    res.send(expenses)
})
app.post('/expenses',async(req,res)=>{
    console.log(req.body)
    const newexpense=req.body;
    await Expense.create(newexpense);
    const expenses1=await Expense.find()
    res.send("created")
})
app.get('/expenses/:id',async(req,res)=>{
    try{
    const id=req.params.id
    const result=await Expense.findById(id)
    console.log(req.params.id)
    if(result){
        res.send(result)
    }
    else{
        res.send("no expenses in that id")
    }
}
catch(err){
    res.send(err)
}
})
app.delete('/expenses/:id',async(req,res)=>{
    try{
    const id=req.params.id
    const result=await Expense.findByIdAndDelete(id)
    console.log(req.params.id)
    if(result){
        res.send(result)
    }
    else{
        res.send("no expenses")
    }
}
catch(err){
    res.send(err)
}
})
app.put('/expenses/:id',async(req,res)=>{
    try{
    const id=req.params.id
    const updateobject= req.body  
    const updatedobject=await Expense.findByIdAndUpdate(id,{$set:updateobject},{new : true})
        
    console.log(req.params.id)
    if(result){
        res.send(updatedobject)
    }
    else{
        res.send("no expenses")
    }
}
catch(err){
    res.send(err)
}
})
app.listen(port,()=>{
    console.log(`example app listening on ${port}`)
})