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

export const getUserSubscription = async (req, res) => {
    try {
        const userId = req.params.id;

        const subscriptionList = await Subscription.find(userId);
        if(!subscriptionList){
            const error = new Error('No subscription found, Please subscribe');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success : true,
            message : 'Fetched user subscription',
            subscriptionList,
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




