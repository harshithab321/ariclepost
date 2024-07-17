const mongoose=require('mongoose');

const article=new mongoose.Schema({
    articleId:{
        type:Number,
        unique:true,
        required:true

    },
    title:{
        type:String,
        unique:true,
        required:true

    },
    author:{
        type:String,
        unique:true,
        required:true

    },
    body:{
        type:String,
        unique:true,
        required:true

    },
    numberOfLikes:{
        type:Number,
       
        required:true

    },
    numberOfViews:{
        type:Number,
        
        required:true

    },
    

})

const Article=mongoose.model('Article',article);
module.exports=Article;