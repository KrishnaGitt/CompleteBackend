import { Router } from "express";
import {registorUser,loginUser,logoutUser} from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.midleware.js";
import {verifyJWT} from "../middleware/auth.middleware.js" 
const router=Router();

// router.route("/l").get(registorUser);

export default router

router.route("/register").post(
    upload.fields([
        {name:"avatar",
        maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
]),registorUser);

router.route("/login").post(
    loginUser);

router.route("/logout").post(
        verifyJWT,
        logoutUser);