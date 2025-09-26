import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    addVendor, getVendors, updateVendors, deleteVendor, 
    getUsers, updateUsers, addUser, deleteExhibitor
} from "../controllers/admin/index.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const AdminRouter = Router();

AdminRouter.use(isLoggedIn);

AdminRouter.get("/get-vendors", getVendors);
AdminRouter.post("/add-vendor", upload.single("file"), addVendor);
AdminRouter.put("/update-vendor/:id", upload.single("imgSrc"), updateVendors);
AdminRouter.delete("/delete-vendor/:id", deleteVendor);
AdminRouter.get("/get-users", getUsers);
AdminRouter.put("/update-user/:id", upload.none(), updateUsers);
AdminRouter.post("/add-user", upload.none(), addUser);
AdminRouter.delete("/delete-exhibitor/:id", deleteExhibitor);

export default AdminRouter;