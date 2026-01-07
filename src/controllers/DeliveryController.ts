import { Request, Response } from 'express';
import { DispatcherService } from '../services/DispatcherService';
import { Parcel } from '../models/Parcel';
import { ConflictError } from '../types';

export class DeliveryController {
  static async assignPackage(req: Request, res: Response): Promise<void> {
    try {
      const { parcelId, driverId } = req.body;

      if (!parcelId || !driverId) {
        res.status(400).json({ error: 'Missing parcelId or driverId' });
        return;
      }

      const pkg = await Parcel.findOne({
        where: { id: parcelId, status: 'PENDING' }
      });

      if (!pkg) {
        res.status(404).json({ error: 'Parcel not found or already assigned' });
        return;
      }

      await DispatcherService.assignPackageToDriver(parcelId, driverId);

      res.status(201).json({
        success: true,
        message: 'Parcel assigned successfully',
        data: { parcelId, driverId }
      });

    } catch (error) {
      if (error instanceof ConflictError) {
        res.status(409).json({ error: error.message });
        return;
      }
      
      console.error('Assignment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPackageStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pkg = await Parcel.findByPk(id);
      
      if (!pkg) {
        res.status(404).json({ error: 'Parcel not found' });
        return;
      }

      res.json({ data: pkg });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch parcel status' });
    }
  }
}