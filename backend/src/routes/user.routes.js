import { Router } from "express";
import { googleAuth } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/googleAuth").post(googleAuth);

//secured routes

// router.route("/getItems").get(verifyJWT, getItems);

export default router;
