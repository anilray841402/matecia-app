import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    getExhibitorDetails, submitBadges, getBadges, deleteBadge, updateBadges,
    getPaymentRecord, submitPaymentrecord, deletePaymentRecord, updatePaymentRecord,
    getPowerOrder, submitPowerOrder, updatePowerOrder, reOpenPowerOrder, submitBoothDesign,
    getBoothDesign, reopenBoothDesign, updateBoothDesign, submitMaterialAdda, getMaterialAdda,
    reOpenMaterialAdda, updateMaterialAdda
} from "../controllers/exhibitor/index.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/edit-exhibitor", isLoggedIn, getExhibitorDetails);

router.post("/submit-badges", isLoggedIn, submitBadges);
router.get("/get-badges", isLoggedIn, getBadges);
router.delete("/delete-badge/:id", isLoggedIn, deleteBadge);
router.put("/update-badges/:id", isLoggedIn, updateBadges);

router.post("/submit-payment-record", isLoggedIn, submitPaymentrecord);
router.get("/get-payment-record", isLoggedIn, getPaymentRecord);
router.delete("/delete-payment-record/:id", isLoggedIn, deletePaymentRecord);
router.put("/update-payment-record/:id", isLoggedIn, updatePaymentRecord);

router.post("/submit-power-order", isLoggedIn, submitPowerOrder);
router.get("/get-power-order", isLoggedIn, getPowerOrder);
router.put("/update-power-order/:id", isLoggedIn, updatePowerOrder);
router.put("/reopen-power-order/:id", isLoggedIn, reOpenPowerOrder);

router.post("/submit-booth-design", isLoggedIn, upload.single("boothDesignPath"), submitBoothDesign);
router.get("/get-booth-design", isLoggedIn, getBoothDesign);
router.put("/reopen-booth-design/:id", isLoggedIn, reopenBoothDesign);
router.put("/update-booth-design/:id", isLoggedIn, upload.single("boothDesignPath"), updateBoothDesign);

router.post("/submit-material-adda", isLoggedIn, upload.fields([
    { name: 'productImg1', maxCount: 1 },
    { name: 'productImg2', maxCount: 1 },
    { name: 'productImg3', maxCount: 1 },
    { name: 'productImg4', maxCount: 1 },
    { name: 'productImg5', maxCount: 1 },
]), submitMaterialAdda);
router.get("/get-material-adda", isLoggedIn, getMaterialAdda);
router.put("/update-material-adda/:id", isLoggedIn, upload.fields([
    { name: 'productImg1', maxCount: 1 },
    { name: 'productImg2', maxCount: 1 },
    { name: 'productImg3', maxCount: 1 },
    { name: 'productImg4', maxCount: 1 },
    { name: 'productImg5', maxCount: 1 },
]), updateMaterialAdda);
router.put("/reopen-material-adda/:id", isLoggedIn, reOpenMaterialAdda);



export default router;
