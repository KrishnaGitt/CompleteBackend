import { Router } from "express";
import {registorUser} from "../controllers/user.controller.js"
const router=Router();
console.log("Inside User Routes")
// router.route("/l").get(registorUser);

export default router

router.route("/l").get((req,res)=>{
res.send("hello")
});