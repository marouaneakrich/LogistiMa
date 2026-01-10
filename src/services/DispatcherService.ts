import { sequelize } from '../config/database';
import { Delivery } from '../models/Delivery';
import { Parcel } from '../models/Parcel';
import { QueueService } from './QueueService';
import { ConflictError } from '../types';
import { Transaction, Op } from 'sequelize';

export class DispatcherService {
    static async assignPackageToDriver(
        packageId: number,
        driverId: number
    ): Promise<void> {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
        });

        try {
            const slot = await Delivery.findOne({
                where: {
                    driverId,
                    available: true,
                    remainingCapacity: { [Op.gt]: 0 }
                },
                lock: transaction.LOCK.UPDATE,
                transaction
            });

            if (!slot) {
                throw new ConflictError('Delivery slot not available');
            }

            await slot.update({
                remainingCapacity: slot.remainingCapacity! - 1,
                available: (slot.remainingCapacity! - 1) > 0
            }, { transaction });

            await Parcel.update({
                driverId,
                status: 'ASSIGNED'
            }, {
                where: { id: packageId, status: 'PENDING' },
                transaction
            });

            await transaction.commit();

            await QueueService.addRouteCalculationJob({ packageId, driverId });
            await QueueService.addReceiptGenerationJob({ packageId });

        } catch (error) {
            await transaction.rollback();
            if (error instanceof ConflictError) throw error;
            throw new Error(`Assignment failed: ${error}`);
        }
    }
}