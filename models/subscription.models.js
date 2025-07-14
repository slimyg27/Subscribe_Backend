import mongoose from "mongoose";


const subscriptionSchema =  new mongoose.Schema({

     name : {
        type : String,
        required : [true, 'Subscription Name is required'],
        trim : true,
        minLength : 2,
        maxLength : 100,

    },
     prince : {
        type : Number,
        required : [true, 'Subscription prince is required'],
        min : [0, 'Subscription price is required']
    },
    currency : {
        type : String,
        enum : ["USD", "EUR", "GBP", "INR"],
        default : "USD",
        required : true
    },
    frequency : {
        type : String,
        enum : [ "DAILY", "MONTHLY", "WEEKLY, YEARLY"],
        default : "WEEKLY"

    },

    category : {
        type : String,
        enum : [ "SPORT", "NEWS", "ENTERTAINMENT" , "LIFESTYLE", "FASHION", "POLITICS", "OTHERS"],
        required : true
    },

    paymentMethod : {
        type :  String,
        required : true,
        trime : true
    },

    status : {
        type : String,
        enum : ["ACTIVE", "CANCELLED", "EXPIRED"],
        default : "ACTIVE"
    },

    startDate : {
        type : Date,
        required : true,
        validate : {
            validator : (value) => value <= new Date(),
            message : 'Start date must be in the past',
        }

    },

     renewalDate : {
        type : Date,
        validate : {
            validator : function(value){
                return value > this.startDate;
            },
            message : 'Start date must be in the past',
        }

    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true,
        index : true
    }


    
}, {timestamps : true})


subscriptionSchema.pre('save', (next) => {
    if(!this.renewalDate){
        const renewalPeriods = {
            DAILY : 1,
            MONTHLY : 30,
            WEEKLY : 7,
            YEARLY : 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'EXPIRED';
    }

    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;