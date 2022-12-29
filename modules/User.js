const mongoose =require( 'mongoose'); // imported mongoose so it can take care of the data coming to store in the monogodb
const { Schema } = mongoose; // data pattern so we can make a json out of it

const userSchema = new Schema({
  name:{
    type: String,
    required : true,
  },
  email:{
    type: String,
    required : true,
    unquie : true,
  },
  password:{
    type: String,
    required : true,
    unquie : true
  },
  date:{
    type: Date,
    default : Date.now
  }
});
module.exports = mongoose.model('user',userSchema);