import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Username is required'],
        trim : true,
        minLength : 2,
        maxLength : 50
    },
     emaile : {
        type : String,
        required : [true, 'User email is required'],
        trim : true,
        unique : true,
        lowercase : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
     password : {
        type : String,
        required : [true, 'Password is required'],
        minLength : 6,
        maxLength : 50,
    },




}, {timestamps :true})


const User = mongoose.model("User", userSchema);

export default User;


