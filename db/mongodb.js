import mongoose from 'mongoose';

import { DB_URI, DB_NAME, NODE_ENV } from '../config/env.js';

if(!DB_URI){
    throw new console.error('PLEASE DEFINE MONGODB URI IN THE ENVIRONMENT VARIABLE inside .env.<production/development>.local');
}
    
const connectDB = async() => {
    try {

        await mongoose.connect(DB_URI);
        console.log(`Connected to DB in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error("Error connecting to the database", error);

        process.exit(1);
    }
}

export default connectDB;


