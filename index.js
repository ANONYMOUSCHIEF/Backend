const connectToMongo=require('./db')
const express=require('express');
const { Router } = require('express');
const cors = require("cors")
connectToMongo();
const app=express()
app.use(cors())
const port=5000
app.use(express.json())
// Available routes
app.use('/api/auth',require('./Routers/auth'));
app.use("/api/note",require('./Routers/note'))
app.listen(port,()=>{
    console.log(`iNote backend is listening at http://localhost:${port}`)
   
})