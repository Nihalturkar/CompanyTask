var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")

var userSchema = mongoose.Schema({
  name:String,
  email:String,
  mobile:String,

  taskid: { type: mongoose.Schema.Types.ObjectId,
  ref: 'Task'},
})

module.exports = mongoose.model("Users",userSchema);