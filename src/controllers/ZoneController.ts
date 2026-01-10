import Driver from "../models/Driver";
import Zone from "../models/Zone";
import { Request, Response } from "express";

// Create a new zone

export const createZone = async (req: Request, res: Response) => {
  try {
    const { name, centerLat, centerLng, radius } = req.body;

    const zone = await Zone.create({
      name,
      centerLat,
      centerLng,
      radius,
    });

    res.status(201).json({
      message: "Zone created successfully",
      zone,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
// Get all zones
export const getAllZones = async (req: Request, res: Response) => {
  try {
    const zone = await Zone.findAll();
    res.json(zone);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getZoneById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findByPk(id, {
      include: {
        model: Driver,
      },
    });

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.status(200).json(zone);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
//detete zone by id
export const deleteZone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findByPk(id);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    await zone.destroy();
    res.status(200).json({ message: "Zone deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

//update zone by id

export const updateZone = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { name, centerLat, centerLng, radius } = req.body;

    const zone = await Zone.findByPk(id);

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    if (name !== undefined) zone.set("name", name);
    if (centerLat !== undefined) zone.set("centerLat", centerLat);
    if (centerLng !== undefined) zone.set("centerLng", centerLng);
    if (radius !== undefined) zone.set("radius", radius);

    await zone.save();

    return res.status(200).json({
      message: "Zone updated successfully",
      zone,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unknown error" });
  }
};


