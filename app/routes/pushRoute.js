import { Router } from "express";
import * as pushService from '../services/pushService.js';

const pushRouter = Router();

pushRouter.get('/', async (req, res) => {
    const allPushs = await pushService.getAllSubscribe();
    res.json(allPushs).status(200);
});

pushRouter.get('/find-one/:pushId', async (req, res) => {
    const onePush = await pushService.getOneSubscribe(req.params.pushId);
    res.json(onePush).status(200);
});

pushRouter.get('/key', async (req, res) => {
    const key = await pushService.getVapidKey();
    res.json(key).status(200);
});

pushRouter.post('/subscribe', async (req, res) => {
    if (!req.body.endpoint || !req.body.p256dh || !req.body.auth) {
        res.send('Error: endpoint, p256dh, auth are required keys').status(404);
        return;
    }
    const addSubscribe = await pushService.subscribe(req.body.endpoint, req.body.p256dh, req.body.auth);
    res.json(addSubscribe).status(200);
});

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
