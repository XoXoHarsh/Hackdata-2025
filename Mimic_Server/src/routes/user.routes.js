import { Router } from "express";
import { googleAuth } from "../controllers/user.controller.js";

const router = Router();

router.route("/googleAuth").post(googleAuth);

export default router;
