import { Router } from "express";
import * as postService from '../services/postService.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required: 
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the Post
 *         content: 
 *           type: string
 *           description: The content of the Post
 *       example:
 *         id: 123
 *         title: My first post
 *         content: The text in the content on my first post
 */

const postRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post managing API
 * /api/post/:
 *   get:
 *     summary: Get all the Posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: All Posts informations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
postRouter.get('/', async (req, res) => {
    const allPosts = await postService.getPosts();
    res.status(200).json(allPosts);
});

/**
 * @swagger
 * tags:
 *   name: Post
 * /api/post/find-one/{postId}:
 *   get:
 *     summary: Get the Post by id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The Post information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
postRouter.get('/find-one/:postId', async (req, res) => {
    const onePost = await postService.getPost(req.params.postId);
    if (!onePost) {
        res.status(404).send('Error: no post found with this Id');
    } else {
        res.status(200).json(onePost);
    }
});

/**
 * @swagger
 * tags:
 *   name: Post
 * /api/post/create/:
 *   post:
 *     summary: Create a new Post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The created Post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
postRouter.post('/create/', async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.json('Error: missing title and content').status(404);
    } else {
        const newPost = await postService.createPost(req.body.title, req.body.content);
        if (!newPost) {
            res.json('Error: An error occured during the save').status(500);
        } else {
            res.json(newPost).status(201);
        }
    }
});

/**
 * @swagger
 * tags:
 *   name: Post
 * /api/post/update/{postId}:
 *   put:
 *     summary: Update a Post by the id
 *     tags: [Post]
 *     parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: string
 *        required: true
 *        description: The Post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The updated Post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
postRouter.put('/update/:postId', async (req, res) => {
    if (!req.params.postId || !req.body.title || !req.body.content) {
        res.json('Error: postId, title and content are required').status(404);
    } else {
        let checkPost = await postService.getPost(req.params.postId);
        if (!checkPost) {
            res.json('Error: This postId is unknow in database').status(404);
            return;
        }
        const updatedPost = await postService.updatePost(checkPost, req.body.title, req.body.content);
        res.json(updatedPost).status(200);
    }
});


/**
 * @swagger
 * tags:
 *   name: Post
 * /api/post/delete/{postId}:
 *   delete:
 *     summary: Remove the Post by id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post id
 *     responses:
 *       200:
 *         description: The Post was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
postRouter.delete('/delete/:postId', async (req, res) => {
    const checkPost = await postService.getPost(req.params.postId);
    if(!checkPost) {
        res.status(404).send('Error: this post id is not found in database');
        return;
    }
    await postService.deletePost(checkPost);
    res.json('Success: Post deleted').status(200);
});

postRouter.get('/search', async (req, res) => {
    const posts = await postService.getPostsWithSearch(req.query);
    res.status(200).json(posts);
});

export default postRouter;
