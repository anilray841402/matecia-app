import { Router } from "express";
import { getAdditionalPowerOrder, getPaymentRecord } from "../controllers/account/index.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const AccountRouter = Router();

AccountRouter.get("/get-additional-power-order", isLoggedIn, getAdditionalPowerOrder);
AccountRouter.get("/get-payment-record", isLoggedIn, getPaymentRecord);

export default AccountRouter;
