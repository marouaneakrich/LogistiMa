import * as express from "express";
import { createDriver, getAllDrivers, getDriverById, deleteDriver, updateDriver } from "../controllers/DriverController";

const router = express.Router();

router.post("/driver", createDriver);
router.get("/drivers", getAllDrivers);
router.get("/driver/:id", getDriverById);
router.delete("/driver/:id", deleteDriver);
router.put("/driver/:id", updateDriver);

export default router;
