const express=require('express');
const app=express();
const redis = require('redis');
require('./connection/connection').connect();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Most=require('./routers/mostpopart')
require('./routers/redis')



app.use('/api/mostpopart',Most);



app.listen(3000,()=>{
    console.log("listining on port 3000");
});