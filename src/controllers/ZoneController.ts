import Driver from "../models/Driver";
import Zone from "../models/Zone";


export const createZone = async (req, res) => {
  try {
    const { name, centraLat, centraLng, radius } = req.body;

    const zone = await Zone.create({
    name, centraLat, centraLng, radius,
    });
   
    res.status(201).json({
      message: "Zone created successfully",
      zone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllZones = async (req, res) => {
  try {
    const zone = await Zone.findAll();
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getZoneById = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findByPk(id, {
      include: {
        model:Driver ,
      },
    });

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
