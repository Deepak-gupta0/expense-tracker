import mongoose from "mongoose";

export const User = mongoose.models.User || mongoose.model("User", {
  fullname : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  }
})