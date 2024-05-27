import { Router } from "express";
const userRouter = Router();
import * as userService from "../services/userService.js"

/**
 * @swagger
 *
 *  components:
 *      schema:
 *          user:
 *              type: object
 *              properties:
 *                  last_name:
 *                      type: string
 *                  first_name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  telephone:
 *                      type: string
 *                  role_id:
 *                      type: integer
 *          user_fav_sport:
 *              type: object
 *              properties:
 *                  id_sport:
 *                      type: integer
 *          user_fav_equipe:
 *              type: object
 *              properties:
 *                  id_equipe:
 *                      type: integer
 *          user_event:
 *              type: object
 *              properties:
 *                  id_event:
 *                      type: integer
 */

userRouter.get('/', async (req, res) => {
    let allUsers = await userService.getUsers();
    res.json(allUsers).status(200);
});

/**
 * @swagger
 * /user/find-one/{userId}:
 *  get:
 *      tags:
 *          - User
 *      description: Retourne les informations d'un utilisateur à partir de son Id
 *      parameters:
 *          - name: userId
 *            in: path
 *            description: id de l'utilisateur
 *          - name: token
 *            in: header
 *            description: token d'accès
 *      responses:
 *          200:
 *              description: Retourne les informations d'un utilisateur unique
 *          404:
 *              description: L'id utilisateur saisie n'est pas connu ne base de données
 */
userRouter.get('/find-one/:userId', async (req, res) => {
    if (!req.params) {
        res.json('Error: user id missing in parameters');
    } else {
        let user = await userService.getUser(req.params.userId);
        if (!user) {
            res.json('Error: this user id is unknow in database').status(404);
        } else {
            res.json(user).status(200);
        }
    }
});

export default userRouter;
