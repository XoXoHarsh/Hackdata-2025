import { Router } from "express";
import { googleAuth } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import simulateData from "../controllers/fitness.controller.js";
// import updateDailyData from "../controllers/fitness.controller.js";

const router = Router();

router.route("/googleAuth").post(googleAuth);

//secured routes

// router.route("/getItems").get(verifyJWT, getItems);
// router.route("/simulateData").get(updateDailyData);

export default router;
