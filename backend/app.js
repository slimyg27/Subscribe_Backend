import express, { urlencoded } from "express";

const app = express();

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscribeRouter from "./routes/subscribe.routes.js";
import connectDB from "./db/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
}));
app.use(express.json());

app.use(urlencoded({extended : false}));
app.use(cookieParser());
app.use(arcjetMiddleware);


// DEFINING ROUTES

app.use("/api/v1/auths", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/subscriptions", subscribeRouter);


app.get("/", (req,res) =>{
    res.send("Hiii there")
})




app.use(errorMiddleware);



app.listen(PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectDB();
   console.log("Connected to MongoDB");

})

export default app;