import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";
const router = Router();

router.route("/health-check").get(healthCheck);

export default router;
