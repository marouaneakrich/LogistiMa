import { Router } from 'express';
import { DeliveryController } from '../controllers/DeliveryController';

const router = Router();

/**
 * @swagger
 * /deliveries/assign:
 *   post:
 *     summary: Assign a package to a driver
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parcelId
 *               - driverId
 *             properties:
 *               parcelId:
 *                 type: integer
 *               driverId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Parcel assigned successfully
 *       400:
 *         description: Missing parcelId or driverId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Parcel not found or already assigned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict (e.g. driver already assigned elsewhere)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/assign', DeliveryController.assignPackage);

/**
 * @swagger
 * /deliveries/parcel/{id}:
 *   get:
 *     summary: Get status of a specific parcel
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The parcel ID
 *     responses:
 *       200:
 *         description: Parcel status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parcel'
 *       404:
 *         description: Parcel not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/parcel/:id', DeliveryController.getPackageStatus);

export default router;
