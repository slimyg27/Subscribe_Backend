import express from "express";

const app = express();

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscribeRouter from "./routes/subscription.routes.js";



app.use(express.json());


// DEFINING ROUTES

app.use("/api/v1/auths", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/subscriptions", subscribeRouter);


app.get("/", (req,res) =>{
    res.send("Hiii there")
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

export default app;