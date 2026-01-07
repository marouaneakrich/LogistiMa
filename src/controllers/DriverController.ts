import Driver from "../models/Driver";
import Zone from "../models/Zone";
import { Request, Response } from "express";

//create a new driver
export const createDriver = async (req: Request, res: Response) => {
  try {
    const { name, phone, latitude, Logitude,longitude,capacity,staus } = req.body;

    const zone = await Zone.create({
     name, phone, latitude, Logitude,longitude,capacity,staus 
    });

    res.status(201).json({
      message: "Driver created successfully",
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
// Get all drivers
export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const driver = await Driver.findAll();
    res.json(driver);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
//get driver by id
export const getDriverById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findByPk(id, {
      include: {
        model:Driver ,
      },
    });

    if (!driver) {
      return res.status(404).json({ message: "driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
//delete driver by id
export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;  
    const driver = await Driver.findByPk(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    await driver.destroy();
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
//update driver by id
export const updateDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, latitude,longitude,capacity,staus } = req.body;
    const zone = await Zone.findByPk(id);

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    if (name !== undefined) zone.set("name", name);
    if (phone !== undefined) zone.set("phone", String(phone));
    if (latitude !== undefined) zone.set("latitude", String(latitude));
    if (longitude !== undefined) zone.set("longitude", String(longitude));
    if (capacity !== undefined) zone.set("capacity", String(capacity));
    if (staus !== undefined) zone.set("status", String(staus));

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