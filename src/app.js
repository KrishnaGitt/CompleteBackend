import  express  from "express";
import {PORT} from "./constant.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {CORS_ORIGIN} from "./constant.js"

const app=express();

export {app}
app.use(cors({
    origin:CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded);
app.use(express.static("public"));
app.use(cookieParser);
