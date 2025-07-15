import {Router} from 'express';
import { getSingleuser, getUser } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.get("/", getUser);

userRouter.get("/:id", getSingleuser);


userRouter.post("/", (req, res) => res.send({ title : "Create a user"}));


userRouter.put("/:id", (req, res) => res.send({ title : "Update a user"}));

userRouter.delete("/:id", (req, res) => res.send({ title : "Delete a user"}));


export default userRouter;