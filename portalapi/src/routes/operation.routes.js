import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    getExhibitors, updateExhibitors, emailExhibitors, getBoothDesign, updateBoothDesign, getPowerOrder, 
    getProductSubmission, getReopenRequest, updateReopenRequest, exhibitorLogin, switchBackToAdmin, addExhibitor 
} from "../controllers/operation/index.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

const OperationRouter = Router();

OperationRouter.get("/get-exhibitors", isLoggedIn, getExhibitors);
OperationRouter.post("/add-exhibitor", isLoggedIn, upload.single("file"), addExhibitor);
OperationRouter.put("/update-exhibitor/:id", isLoggedIn, upload.single("imgSrc"), updateExhibitors);
OperationRouter.get("/email-exhibitor/:id", isLoggedIn, emailExhibitors);
OperationRouter.get("/impersonate/:id", isLoggedIn, exhibitorLogin);
OperationRouter.get("/switch-back-admin", isLoggedIn, switchBackToAdmin);
OperationRouter.get("/get-booth-design", isLoggedIn, getBoothDesign);
OperationRouter.put("/update-booth-design/:id", isLoggedIn, updateBoothDesign);
OperationRouter.get("/get-power-order", isLoggedIn, getPowerOrder);
OperationRouter.get("/get-product-submission", isLoggedIn, getProductSubmission);
OperationRouter.get("/get-reopen-request", isLoggedIn, getReopenRequest);
OperationRouter.put("/update-reopen-request/:id", isLoggedIn, updateReopenRequest);

export default OperationRouter;
