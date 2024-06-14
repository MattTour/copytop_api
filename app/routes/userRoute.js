import { Router } from "express";
import * as userService from '../services/userService.js';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const allUsers = await userService.getUsers();
    res.status(200).json(allUsers);
});

userRouter.get('/find-one/:userId', async (req, res) => {
    const oneUser = await userService.getUser(req.params.userId);
    if (!oneUser) {
        res.status(404).send('Error: no user found with this id');
    } else {
        res.status(200).json(oneUser);
    }
});

userRouter.post('/create', async (req, res) => {
    if (!req.body.first_name || !req.body.last_name
        || !req.body.email || !req.body.password
    ) {
        res.status(404).send('Error: Missing first_name, last_name, email or password');
    } else {
        const newUser = await userService.createUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password);
        if (!newUser) {
            res.json('Error: An error occured during the save').status(500);
        } else {
            res.json(newUser).status(201);
        }
    }
});

userRouter.put('/update/:userId', async (req, res) => {
    if (!req.body.first_name || !req.body.last_name
        || !req.body.email || !req.body.password
    ) {
        res.status(404).send('Error: Missing first_name, last_name, email or password');
    } else {
        let checkUser = await userService.getUser(req.params.userId);
        if (!checkUser) {
            res.send('Error: This user id is unknow in database').status(404);
            return
        }
        const updatedUser = await userService.updateUser(checkUser, req.body.last_name, req.body.first_name, req.body.email, req.body.password);
        res.json(updatedUser).status(200);
    }
});

userRouter.delete('/delete/:userId', async (req, res) => {
    const deletedUser = await userService.deleteUser(req.params.userId);
    if (!deletedUser) {
        res.send('Error: User not deleted').status(404);
        return;
    }
    res.send('Success: User deleted').status(200);
});

export default userRouter;
