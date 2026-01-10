import { DispatcherService } from '../../src/services/DispatcherService';
import { Delivery } from '../../src/models/Delivery';
import { Parcel } from '../../src/models/Parcel';
import { ConflictError } from '../../src/types';

describe('DispatcherService', () => {
  beforeEach(async () => {
    await Delivery.destroy({ where: {} });
    await Parcel.destroy({ where: {} });
  });

  it('should successfully assign package when slot is available', async () => {
    await Delivery.create({
      driverId: 1,
      zoneId: 1,
      capacity: 5,
      remainingCapacity: 5,
      available: true
    });

    await Parcel.create({
      id: 1,
      status: 'PENDING',
      pickupAddress: 'Casablanca',
      deliveryAddress: 'Rabat'
    });

    await DispatcherService.assignPackageToDriver(1, 1);

    const slot = await Delivery.findOne({ where: { driverId: 1 } });
    const pkg = await Parcel.findByPk(1);

    expect(slot?.remainingCapacity).toBe(4);
    expect(pkg?.status).toBe('ASSIGNED');
    expect(pkg?.driverId).toBe(1);
  });

  it('should throw ConflictError when slot is full', async () => {
    await Delivery.create({
      driverId: 1,
      zoneId: 1,
      capacity: 1,
      remainingCapacity: 0,
      available: false
    });
    await Parcel.create({
      id: 1,
      status: 'PENDING',
      pickupAddress: 'Casablanca',
      deliveryAddress: 'Rabat'
    });
    await expect(DispatcherService.assignPackageToDriver(1, 1))
      .rejects.toThrow(ConflictError);
  });
});