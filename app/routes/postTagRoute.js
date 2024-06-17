import { Router } from "express";
import * as postTagService from '../services/postTagModel.js';

const postTagRouter = Router();

postTagRouter.get('/', async (req, res) => {
    const allPostsTags = await postTagService.getPostsTags();
    res.status(200).json(allPostsTags);
});

postTagRouter.get('/find-one/:postTagId', async (req, res) => {
    const onePostTag = await postTagService.getPostTag(req.params.postTagId);
    if(!onePostTag) {
        res.status(404).send('Error: no relation found with this id');
    } else {
        res.status(200).json(onePostTag);
    }
});

postTagRouter.post('/create', async (req, res) => {
    if(!req.body.post_id || !req.body.tag_id) {
        res.send('Error: post_id and tag_id are required').status(404);
    } else {
        const newPostTag = await postTagService.createPostTag(req.body.post_id, req.body.tag_id);
        if(!newPostTag) {
            res.send('Error: An error occured during the save').status(500);
        } else {
            res.json(newPostTag).status(201);
        }
    }
});

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
