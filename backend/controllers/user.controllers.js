import User from "../models/user.models.js";



export const getUser = async (req , res, next) => {
    try {

        const user = await User.find();
        res.status(200).json({
            success : true,
            message : "Fetched all users",
            data : user
            
        })
      
    } catch (error) {
        next(error);
    }
}


export const getSingleuser = async (req, res, next) => {

    try {
        
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error("Invalid ID");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success : true,
            message : "User details",
            data : user
        })
        
    } catch (error) {
        next(error);
    }
}