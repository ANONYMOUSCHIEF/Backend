const mongoose = require('mongoose')
//const mongoDb=require('mongoose')
const mongoURI="mongodb+srv://anonymous-chief:test123@cluster0.sx8cqrv.mongodb.net/inote"
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo");
    })
}
module.exports=connectToMongo;