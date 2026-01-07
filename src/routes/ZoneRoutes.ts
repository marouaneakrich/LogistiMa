import * as express from "express";
import { createZone, getAllZones, getZoneById, deleteZone, updateZone } from "../controllers/ZoneController";

const router = express.Router();

router.post("/zones", createZone);
router.get("/zones", getAllZones);
router.get("/zones/:id", getZoneById);
router.delete("/zones/:id", deleteZone);
router.put("/zones/:id", updateZone);

export default router;
