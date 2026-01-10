import request, { Response } from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';
import { Delivery } from '../../src/models/Delivery';
import { Parcel } from '../../src/models/Parcel';

describe('Stress Test - Race Conditions', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });

        await Delivery.create({
            driverId: 1,
            zoneId: 1,
            capacity: 1,
            remainingCapacity: 1,
            available: true
        });

        for (let i = 1; i <= 50; i++) {
            await Parcel.create({
                id: i,
                status: 'PENDING',
                pickupAddress: 'Casablanca',
                deliveryAddress: 'Rabat'
            });
        }
    }, 60000);

    it('should handle 50 concurrent assignments with only 1 success', async () => {
        const promises = Array.from({ length: 50 }, (_, i) =>
            request(app)
                .post('/api/deliveries/assign')
                .send({
                    parcelId: i + 1,
                    driverId: 1
                })
        );

        const results = await Promise.all(promises);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const successCount = results.filter((r: Response) => r.status === 201).length;
        const conflictCount = results.filter((r: Response) => r.status === 409).length;

        expect(successCount).toBe(1);
        expect(conflictCount).toBeGreaterThanOrEqual(40);

        const slot = await Delivery.findOne({ where: { driverId: 1 } });
        expect(slot?.remainingCapacity).toBe(0);
        expect(slot?.available).toBe(false);
    }, 60000);
});