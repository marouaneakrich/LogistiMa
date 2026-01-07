import { Router } from 'express';
import { DeliveryController } from '../controllers/DeliveryController';

const router = Router();

router.post('/assign', DeliveryController.assignPackage);
router.get('/parcel/:id', DeliveryController.getParcelStatus);

export default router;