import { Router } from "express";
import * as userService from '../services/userService.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: 
 *         - last_name
 *         - first_name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the User
 *         last_name:
 *           type: string
 *           description: The User last name
 *         first_name: 
 *           type: string
 *           description: The User first name
 *         email:
 *           type: string
 *           description: The User email
 *         password:
 *           type: string
 *           description: The User password
 *       example:
 *         id: 123
 *         last_name: Smith
 *         first_name: John
 *         email: john.smith@dsq.com
 *         password: falsePassword
 */

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /api/user/:
 *   get:
 *     summary: Get all the Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: All Users informations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.get('/', async (req, res) => {
    const allUsers = await userService.getUsers();
    res.status(200).json(allUsers);
});

/**
 * @swagger
 * tags:
 *   name: Post
 * /api/user/find-one/{userId}:
 *   get:
 *     summary: Get the User by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The User information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.get('/find-one/:userId', async (req, res) => {
    const oneUser = await userService.getUser(req.params.userId);
    if (!oneUser) {
        res.status(404).send('Error: no user found with this id');
    } else {
        res.status(200).json(oneUser);
    }
});

/**
 * @swagger
 * tags:
 *   name: User
 * /api/user/create/:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * tags:
 *   name: User
 * /api/user/update/{userId}:
 *   put:
 *     summary: Update a User by the id
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * tags:
 *   name: User
 * /api/user/delete/{userId}:
 *   delete:
 *     summary: Remove the User by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.delete('/delete/:userId', async (req, res) => {
    const checkUser = await userService.getUser(req.params.userId);
    if(!checkUser) {
        res.status(404).send('Error: user id not found in database');
        return;
    }
    await userService.deleteUser(checkUser);
    res.json('Success: User deleted').status(200);
});

export default userRouter;
