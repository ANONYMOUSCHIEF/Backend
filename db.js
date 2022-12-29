const mongoose = require('mongoose')
//const mongoDb=require('mongoose')
const mongoURI="mongodb://localhost:27017/inote"
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo");
    })
}
module.exports=connectToMongo;