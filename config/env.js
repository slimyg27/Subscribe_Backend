import {config} from "dotenv";

config({path: `.env.${process.env.NODE_ENV || "development"}.local`});


export const {PORT, DB_URI, DB_NAME , NODE_ENV} = process.env;