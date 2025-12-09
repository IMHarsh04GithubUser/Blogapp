// lib/models/userModel.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminSchema = ({
  adminname:{
    type: String,
    role: 'admin',
    require:true
  },
  adminpass:{
    type:String,
    require:true
  },
  logo:{
    type:String
  }
})


const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin",AdminSchema);

export default User;
