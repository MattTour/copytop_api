import { Router } from "express";
import * as postService from '../services/postService.js';

const postRouter = Router();

postRouter.get('/', async (req, res) => {
    const allPosts = await postService.getPosts();
    res.status(200).json(allPosts);
});

postRouter.get('/find-one/:postId', async (req, res) => {
    const onePost = await postService.getPost(req.params.postId);
    if (!onePost) {
        res.status(404).send('Error: no post found with this Id');
    } else {
        res.status(200).json(onePost);
    }
});

postRouter.post('/create', async (req, res) => {
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

postRouter.delete('/delete/:postId', async (req, res) => {
    const deletedPost = await postService.deletePost(req.params.postId);
    if (!deletedPost) {
        res.send('Error: Post not deleted').status(404);
        return;
    }
    res.send('Success: Post deleted').status(200);
})

export default postRouter;
