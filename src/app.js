import  express  from "express";
import {PORT} from "./constant.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {CORS_ORIGIN} from "./constant.js"
import bodyParser from "body-parser";

const app=express();

export {app}
app.use(cors({
    origin:CORS_ORIGIN,
    credentials:true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

//importing routes

import userRoutes from "./routes/user.routes.js"

app.use("/user",userRoutes);
