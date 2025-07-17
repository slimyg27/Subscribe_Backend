import { Router } from "express";
import {getallSubscription,  createSubscription, getUserSubscription,updateSubscription } from "../controllers/subscribe.controllers.js";
import authorize from "../middlewares/auth.middleware.js";
import isSubscriber from "../middlewares/isSubscriber.middleware.js";

const subsribeRouter = Router();

subsribeRouter.get("/", authorize, getallSubscription);


subsribeRouter.get("/:id", getUserSubscription);


subsribeRouter.post("/:id", authorize, createSubscription);


subsribeRouter.put("/:subId",authorize, isSubscriber ,updateSubscription);



subsribeRouter.delete("/:id", (req, res) => { res.send({title : "Delete a subscription"}) });


subsribeRouter.get("/user/:id", (req, res) => { res.send({title : "GET all user subscriptions"}) });



subsribeRouter.put("/user/cancel", (req, res) => { res.send({title : "CANCEL User subscription"}) });


subsribeRouter.get("/upcoming-renewals", (req, res) => { res.send({title : "GET all upcoming renewals"}) });



export default subsribeRouter;