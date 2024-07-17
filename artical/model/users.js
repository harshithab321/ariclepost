const mongoose=require('mongoose');

const users=new mongoose.Schema({
    userid:{
         type:Number,
         required:true,
         unique:true
    },
    userName:{
       type:String,
       required:true,
    }
})

const User=mongoose.model('User',users);
module.exports=User