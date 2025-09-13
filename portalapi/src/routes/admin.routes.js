import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    addVendor , getVendors, updateVendors, deleteVendor, getUsers, updateUsers, addUser, deleteExhibitor
} from "../controllers/admin/index.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

const AdminRouter = Router();

AdminRouter.get("/get-vendors", isLoggedIn, getVendors);
AdminRouter.post("/add-vendor", isLoggedIn, upload.single("file"), addVendor);
AdminRouter.put("/update-vendor/:id", isLoggedIn, upload.single("imgSrc"), updateVendors);
AdminRouter.delete("/delete-vendor/:id", isLoggedIn, deleteVendor);
AdminRouter.get("/get-users", isLoggedIn, getUsers);
AdminRouter.put("/update-user/:id", isLoggedIn, upload.none(), updateUsers);
AdminRouter.post("/add-user", isLoggedIn, upload.none(), addUser);
AdminRouter.delete("/delete-exhibitor/:id", isLoggedIn, deleteExhibitor);

export default AdminRouter;
