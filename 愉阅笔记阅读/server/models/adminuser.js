var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//定义一个schema
var adminuser=new Schema({
    'ID':Number,
    'username':String,
    'password':String
})
//输出
module.exports=mongoose.model('admin',adminuser)