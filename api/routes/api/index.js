import { Router } from "express";
import authRoute from "./authRoute.js";
import listingRoute from "./listingRoute.js";
import userRoute from "./userRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/listing", listingRoute);

export default router;
