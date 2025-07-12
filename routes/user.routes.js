import {Router} from 'express';

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("Get all users"));

userRouter.get("/:id", (req, res) => res.send({ title : "Get a user detail"}));


userRouter.post("/", (req, res) => res.send({ title : "Create a user"}));


userRouter.put("/:id", (req, res) => res.send({ title : "Update a user"}));

userRouter.delete("/:id", (req, res) => res.send({ title : "Delete a user"}));


export default userRouter;