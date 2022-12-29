const mongoose =require( 'mongoose');
const { Schema } = mongoose;
const noteSchema = new Schema({
  user:{
    type:String,
    ref:"user"
  },
  title:{
    type: String,
    required : true,
  },
  description:{
    type: String,
    required : true,
  },
  tags:{
    type: String,
    default:"General"
  },
  date:{
    type: Date,
    default : Date.now
  }
});
module.exports = mongoose.model('note',noteSchema);