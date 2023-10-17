/* 
- import mongoose
- create a variable that will store the schema (model) [Name Of the Model + "Schema"]
- create an object of what data will be stored in the database (Rules)
- export the model (so it can be used in other files)
*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, // this will make sure that the email is unique (no duplicates)
  },
  password: {
    type: String,
    required: true,
  },
});
//                           Name of Collection, Schema
module.exports = mongoose.model("User", UserSchema);
