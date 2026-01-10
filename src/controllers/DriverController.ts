import Driver from "../models/Driver";
import Zone from "../models/Zone";
import { Request, Response } from "express";

//create a new driver
export const createDriver = async (req: Request, res: Response) => {
  try {
    const { name, phone, latitude, longitude, capacity, status, zoneId } = req.body;

    const driver = await Driver.create({
      name, phone, latitude, longitude, capacity, status, zoneId
    });

    res.status(201).json({
      message: "Driver created successfully",
      driver,
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
    const drivers = await Driver.findAll();
    res.json(drivers);
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
        model: Zone,
        as: 'zone',
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
    const { name, phone, latitude, longitude, capacity, status, zoneId } = req.body;
    const driver = await Driver.findByPk(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    if (name !== undefined) driver.set("name", name);
    if (phone !== undefined) driver.set("phone", phone);
    if (latitude !== undefined) driver.set("latitude", latitude);
    if (longitude !== undefined) driver.set("longitude", longitude);
    if (capacity !== undefined) driver.set("capacity", capacity);
    if (status !== undefined) driver.set("status", status);
    if (zoneId !== undefined) driver.set("zoneId", zoneId);

    await driver.save();

    return res.status(200).json({
      message: "Driver updated successfully",
      driver,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unknown error" });
  }
};