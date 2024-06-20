import { Router } from "express";
import * as pushService from '../services/pushService.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Push:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the Push
 *         endpoint:
 *           type: string
 *           description: The endpoint of the Post
 *         auth_token: 
 *           type: string
 *           description: The p256dh key of the Push
 *         public_key:
 *           type: string
 *           description: The public key of the Push
 *         created_at:
 *           type: date
 *           description: Creation date
 *         updated_at:
 *           type: date
 *           description: Last update date
 *         user_id:
 *           type: number
 *           description: The user id
 *       example:
 *         id: 123
 *         endpoint: FooBarEndpoint
 *         auth_token: FooBarAuthToken
 *         public_key: FooBarPublicKey
 *         created_at: 2024-06-19T13:33:25.000Z
 *         updated_at: 2024-06-19T13:33:25.000Z
 *         user_id: 1
 */

const pushRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Push
 *   description: The Push managing API
 * /api/push/:
 *   get:
 *     summary: Get all the Pushs
 *     tags: [Push]
 *     responses:
 *       200:
 *         description: All Pushs informations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Push'
 *       500:
 *         description: Some server error
 */
pushRouter.get('/', async (req, res) => {
    const allPushs = await pushService.getAllSubscribe();
    res.json(allPushs).status(200);
});

/**
 * @swagger
 * tags:
 *   name: Push
 * /api/push/find-one/{pushId}:
 *   get:
 *     summary: Get the Push by id
 *     tags: [Push]
 *     parameters:
 *       - in: path
 *         name: pushId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Push id
 *     responses:
 *       200:
 *         description: The Push information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Push'
 *       500:
 *         description: Some server error
 */
pushRouter.get('/find-one/:pushId', async (req, res) => {
    const onePush = await pushService.getOneSubscribe(req.params.pushId);
    res.json(onePush).status(200);
});

pushRouter.get('/key', async (req, res) => {
    const key = await pushService.getVapidKey();
    res.json(key).status(200);
});

pushRouter.post('/subscribe', async (req, res) => {
    if (!req.body.endpoint || !req.body.keys.p256dh || !req.body.keys.auth) {
        res.send('Error: endpoint, p256dh, auth are required keys').status(404);
        return;
    }
    const addSubscribe = await pushService.subscribe(req.body.endpoint, req.body.keys.p256dh, req.body.keys.auth);
    res.json(addSubscribe).status(200);
});

/**
 * @swagger
 * tags:
 *   name: Push
 * /api/push/delete/{pushId}:
 *   delete:
 *     summary: Remove the Push by id
 *     tags: [Push]
 *     parameters:
 *       - in: path
 *         name: pushId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Push id
 *     responses:
 *       200:
 *         description: The Push was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Push'
 *       500:
 *         description: Some server error
 */
pushRouter.delete('/delete/:pushId', async (req, res) => {
    const checkPush = await pushService.getOneSubscribe(req.params.pushId);
    if (!checkPush) {
        res.status(404).send('Error: this push id is not found in database');
        return;
    }
    await pushService.deleteSubscribe(checkPush);
    res.json('Success: Push deleted').status(200);
});

export default pushRouter;
