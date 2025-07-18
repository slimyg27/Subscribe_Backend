import Subscription from '../models/subscription.models.js';
import mongoose from 'mongoose';

export const getallSubscription = async (req, res) => {
    try {

        const subscription = await Subscription.find();
        
        res.status(200).json({
            success : true,
            message : "Subscription fetched",
            subscription : subscription
        })
        
    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res,next) => {
    try {
        
        const subscriptionId = req.params.subId;
        const updates = req.body;
        const allowedUpdates = ['name', 'frequency','category','paymentMethod' ];

        const savedUpdates = {};

        for(let key in updates){
            if(allowedUpdates.includes(key)){
                savedUpdates[key] = updates[key];
            }
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(subscriptionId,{$set : savedUpdates}, {new : true , runValidators : true});
       return res.status(200).json({success : true, message : "Subscription updated Successfully", data : updatedSubscription});


    } catch (error) {
        next(error);
    }
}


export const getSubscriptionDetail = async (req, res,next) => {
    try {
        const subId = req.params.subId;

        const subscriptiondetail = await Subscription.findById(subId);
        if(!subscriptiondetail){
            const error = new Error('No subscription found, Please subscribe');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success : true,
            message : 'Fetched user subscription',
            data : subscriptionList,
        })


    } catch (error) {
        next(error);
    }
};




export const getUserSubscription = async (req, res,next) => {
    try {
        const userId = req.params.id;

        const subscriptionList = await Subscription.find({user : userId});
        if(!subscriptionList){
            const error = new Error('No subscription found, Please subscribe');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success : true,
            message : 'Fetched user subscription',
            data : subscriptionList,
        })


    } catch (error) {
        next(error);
    }
}

export const createSubscription = async (req, res, next)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

         const { name, price, currency, frequency, category, paymentMethod, startDate } = req.body;
         const userId = req.user._id;

         const SubscriptiontoSave = await Subscription.create([{
            name,
            price,
            currency,
            frequency,
            category,
            paymentMethod,
            startDate,
            user : userId
         }], {session});

         await session.commitTransaction();
         session.endSession();

         res.status(201).json({
            success : true,
            message : 'Subscription Created Successfully',
            data  : SubscriptiontoSave,
         });

        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
        
    }
}


export const deleteSubscription = async (req, res, next) => {
    const subId = req.params.subId;

    try {
       const deletedsubscription = await Subscription.findByIdAndDelete(subId);
       if(!deletedsubscription){
        return res.status(404).json({
            success : false,
            message : "Subscription not found"
        });
    };

        return res.status(200).json({
            success : true,
            message : "Subscription deleted Successfully"
        });

       
    } catch (error) {
        next(error);
    }
}

export const cancelSubscription = async (req,res,next) => {

    const userId = req.user._id;
    try {
         
        const cancelled = await Subscription.updateMany({user : userId}, {$set : {status : "CANCELLED"}}, {runValidators : true});

        if(!cancelled){
            return res.status(401).json({
                success : false,
                message : "Couldnt do it"
            })
        }

        return res.status(200).json({success : true, message : "CANCELLED user subscription"});
        
    } catch (error) {
        next(error);
    }
}




