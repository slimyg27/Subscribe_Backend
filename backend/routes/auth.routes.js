import {Router} from "express";
import { signIn, signout, signup } from "../controllers/auth.controllers.js";


const authRouter = Router();

authRouter.get("/", (req, res) =>{  res.send({ title : "Signing up user"})
});


// PATH /api/v1/auths/signup
authRouter.post("/signup", signup);

authRouter.post("/signin", signIn);

authRouter.post("/signout", signout);


export default authRouter;