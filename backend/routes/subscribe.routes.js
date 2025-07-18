import { Router } from "express";
import {getallSubscription,  createSubscription, getUserSubscription,updateSubscription, getSubscriptionDetail, deleteSubscription } from "../controllers/subscribe.controllers.js";
import authorize from "../middlewares/auth.middleware.js";
import isSubscriber from "../middlewares/isSubscriber.middleware.js";

const subsribeRouter = Router();

subsribeRouter.get("/", authorize, getallSubscription);


subsribeRouter.get("/:subId", authorize, isSubscriber,getSubscriptionDetail);


subsribeRouter.get("/user/:id",authorize, getUserSubscription);


subsribeRouter.post("/:id", authorize, createSubscription);


subsribeRouter.put("/:subId",authorize, isSubscriber ,updateSubscription);



subsribeRouter.delete("/:subId",authorize,isSubscriber, deleteSubscription);


subsribeRouter.put("/user/cancel", (req, res) => { res.send({title : "CANCEL User subscription"}) });


subsribeRouter.get("/upcoming-renewals", (req, res) => { res.send({title : "GET all upcoming renewals"}) });



export default subsribeRouter;