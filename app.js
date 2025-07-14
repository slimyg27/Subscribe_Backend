import express, { urlencoded } from "express";

const app = express();

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscribeRouter from "./routes/subscribe.routes.js";
import connectDB from "./db/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";



app.use(express.json());
app.use(errorMiddleware);
app.use(urlencoded({extended : false}));
app.use(cookieParser);

// DEFINING ROUTES

app.use("/api/v1/auths", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/subscriptions", subscribeRouter);


app.get("/", (req,res) =>{
    res.send("Hiii there")
})

app.listen(PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`);

   await connectDB();

})

export default app;