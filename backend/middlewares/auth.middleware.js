import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/env.js';
import User from '../models/user.models.js';


const authorize = async (req,res,next) => {
   try {
    let token
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1];
    }

    if(!token)
       return res.status(401).json({message : "Unauthorized"})

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId);
    if(!user)
       return res.status(401).json({message : 'Unauthorized', error : "wrong userId"})
    
    req.user = user;

    next();


   } catch (error) {
     return res.status(401).json({mesaage : "Log in please" , error: error.message});
   }


}

export default authorize;
