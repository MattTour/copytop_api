import { Router } from "express";
import * as postTagService from '../services/postTagModel.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Post-Tag:
 *       type: object
 *       required: 
 *         - post_id
 *         - tag_id
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the post
 *         post_id: 
 *           type: string
 *           description: The Post id
 *         tag_id: 
 *           type: string
 *           description: The Tag id
 *       example:
 *         id: 123
 *         post_id: 1
 *         tag_id: 1
 */

const postTagRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Post-Tag
 *   description: The Post-Tag managing API
 * /api/post-tag/:
 *   get:
 *     summary: Get all the Post-Tag
 *     tags: [Post-Tag]
 *     responses:
 *       200:
 *         description: All Post-Tag relations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post-Tag'
 *       500:
 *         description: Some server error
 */
postTagRouter.get('/', async (req, res) => {
    const allPostsTags = await postTagService.getPostsTags();
    res.status(200).json(allPostsTags);
});

/**
 * @swagger
 * tags:
 *   name: Post-Tag
 * /api/post-tag/find-one/{postTagId}:
 *   get:
 *     summary: Get the Post-Tag by id
 *     tags: [Post-Tag]
 *     parameters:
 *       - in: path
 *         name: postTagId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post-Tag id
 *     responses:
 *       200:
 *         description: The Post-Tag information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Some server error
 */
postTagRouter.get('/find-one/:postTagId', async (req, res) => {
    const onePostTag = await postTagService.getPostTag(req.params.postTagId);
    if(!onePostTag) {
        res.status(404).send('Error: no relation found with this id');
    } else {
        res.status(200).json(onePostTag);
    }
});

/**
 * @swagger
 * tags:
 *   name: Post-Tag
 * /api/post-tag/create/:
 *   post:
 *     summary: Create a new Post-Tag relation
 *     tags: [Post-Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post-Tag'
 *     responses:
 *       201:
 *         description: The created Post-Tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post-Tag'
 *       500:
 *         description: Some server error
 */
postTagRouter.post('/create/', async (req, res) => {
    if(!req.body.post_id || !req.body.tag_id) {
        res.send('Error: post_id and tag_id are required').status(404);
    } else {
        //TODO add check on post_id and tag_id
        const newPostTag = await postTagService.createPostTag(req.body.post_id, req.body.tag_id);
        if(!newPostTag) {
            res.send('Error: An error occured during the save').status(500);
        } else {
            res.json(newPostTag).status(201);
        }
    }
});

/**
 * @swagger
 * tags:
 *   name: Post-Tag
 * /api/post-tag/delete/{postTagId}:
 *   delete:
 *     summary: Remove the Post-Tag relation by id
 *     tags: [Post-Tag]
 *     parameters:
 *       - in: path
 *         name: postTagId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post-Tag id
 *     responses:
 *       200:
 *         description: The Post-Tag was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post-Tag'
 *       500:
 *         description: Some server error
 */
postTagRouter.delete('/delete/:postTagId', async (req,res) => {
    const checkPostTag = await postTagService.getPostTag(req.params.postTagId);
    if(!checkPostTag) {
        res.status(404).send('Error: this relation id is unknow in database');
        return;
    }
    await postTagService.deletePostTag(checkPostTag);
    res.json('Success: Relation deleted').status(200);
});

export default postTagRouter;
