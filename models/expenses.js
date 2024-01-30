const mongoose=require('mongoose')
const expenseschema=new mongoose.Schema({
    amount:Number,
    desc:String,
    title:String,
});
const Expense=mongoose.model('Expense',expenseschema);
module.exports=Expense;