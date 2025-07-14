import {Router} from "express";


const authRouter = Router();

authRouter.get("/", (req, res) =>{  res.send({ title : "Signing up user"})
});

authRouter.post("/signup", (req, res) =>{  res.send({ title : "Signing up user"})
});

authRouter.post("/signin", (req, res) =>{res.send({ title : "Signing in user"})
});

authRouter.post("/signout", (req, res) =>{res.send({ title : "Signing out user"})
});

export default authRouter;