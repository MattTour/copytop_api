import { Router } from "express";
import * as tagService from '../services/tagService.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required: 
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the post
 *         name: 
 *           type: string
 *           description: The name of the Post
 *       example:
 *         id: 123
 *         name: TAG-test
 */

const tagRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: The Tag managing API
 * /api/tag/:
 *   get:
 *     summary: Get all the Tags
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: All Tags informations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Some server error
 */
tagRouter.get('/', async (req, res) => {
    const allTags = await tagService.getTags();
    res.status(200).json(allTags);
});

/**
 * @swagger
 * tags:
 *   name: Tag
 * /api/tag/find-one/{tagId}:
 *   get:
 *     summary: Get the Tag by id
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag id
 *     responses:
 *       200:
 *         description: The Tag information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Some server error
 */
tagRouter.get('/find-one/:tagId', async (req, res) => {
    const oneTag = await tagService.getTag(req.params.tagId);
    if(!oneTag) {
        res.status(404).send('Error: no tag found with this Id');
    } else {
        res.status(200).json(oneTag);
    }
});

/**
 * @swagger
 * tags:
 *   name: Tag
 * /api/tag/create/:
 *   post:
 *     summary: Create a new Tag
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: The created Tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Some server error
 */
tagRouter.post('/create', async (req, res) => {
    if(!req.body.name) {
        res.send('Error: missing name').status(404);
    } else {
        const newTag = await tagService.createTag(req.body.name);
        if(!newTag) {
            res.send('Error: An error occured during the save').status(500);
        } else {
            res.json(newTag).status(201);
        }
    }
});

/**
 * @swagger
 * tags:
 *   name: Tag
 * /api/tag/update/{tagId}:
 *   put:
 *     summary: Update a Tag by the id
 *     tags: [Tag]
 *     parameters:
 *      - in: path
 *        name: tagId
 *        schema:
 *          type: string
 *        required: true
 *        description: The Tag id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: The updated Tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Some server error
 */
tagRouter.put('/update/:tagId', async (req, res) => {
    if(!req.body.name) {
        res.send('Error: name are required').status(404);
    } else {
        let checkTag = await tagService.getTag(req.params.tagId);
        if(!checkTag) {
            res.send('Error: this tagId is unknow in database').status(404);
            return;
        }
        const updatedTag = await tagService.updateTag(checkTag, req.body.name);
        res.json(updatedTag);
    }
});

/**
 * @swagger
 * tags:
 *   name: Tag
 * /api/tag/delete/{tagId}:
 *   delete:
 *     summary: Remove the Tag by id
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Tag id
 *     responses:
 *       200:
 *         description: The Tag was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Some server error
 */
tagRouter.delete('/delete/:tagId', async (req, res) => {
    const checkTag = await tagService.getTag(req.params.tagId);
    if(!checkTag) {
        res.send('Error: this tag id is unknow in database').status(404);
        return;
    }
    await tagService.deleteTag(checkTag);
    res.json('Success: Tag deleted');
});

export default tagRouter;
