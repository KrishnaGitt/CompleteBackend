import { Router } from "express";
import {registorUser} from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.midleware.js";
const router=Router();

// router.route("/l").get(registorUser);

export default router

router.route("/login").post(
    upload.fields([
        {name:"avatar",
        maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
]),registorUser);