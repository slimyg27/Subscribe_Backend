import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.models.js";






export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();


    try {

        const {name, email, password} = req.body ;

        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name,email, password : hashedPassword}], {session});

        const token = jwt.sign({userId : newUsers[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});



       await session.commitTransaction();
       session.endSession();

       res.status(201).json({
        success : true,
        message : "User created successfully",
        data : {
            token,
            data : newUsers[0]
        }

       })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}



export const signIn = async (req, res, next) => {

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordcorrect = await  bcrypt.compare(password, user.password);

        if(!isPasswordcorrect){
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
             }

        const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


        res.status(200).json({
            success : true,
            message : "User signed in",
            data : {
                token,
                user,
            }
        })
        
    } catch (error) {
        next(error);
    }

}



export const signout = async (req, res, next) => {

}