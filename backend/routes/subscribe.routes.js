import { Router } from "express";
import {getallSubscription,  createSubscription } from "../controllers/subscribe.controllers.js";
import authorize from "../middlewares/auth.middleware.js";

const subsribeRouter = Router();

subsribeRouter.get("/", authorize, getallSubscription);


subsribeRouter.get("/:id", (req, res) => { res.send({title : "GET subscription details"}) });


subsribeRouter.post("/:id", authorize, createSubscription);


subsribeRouter.put("/:id", (req, res) => { res.send({title : "Update a subscription"}) });



subsribeRouter.delete("/:id", (req, res) => { res.send({title : "Delete a subscription"}) });


subsribeRouter.get("/user/:id", (req, res) => { res.send({title : "GET all user subscriptions"}) });



subsribeRouter.put("/user/cancel", (req, res) => { res.send({title : "CANCEL User subscription"}) });


subsribeRouter.get("/upcoming-renewals", (req, res) => { res.send({title : "GET all upcoming renewals"}) });



export default subsribeRouter;