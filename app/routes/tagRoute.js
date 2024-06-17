import { Router } from "express";
import * as tagService from '../services/tagService.js';

const tagRouter = Router();

tagRouter.get('/', async (req, res) => {
    const allTags = await tagService.getTags();
    res.status(200).json(allTags);
});

tagRouter.get('/find-one/:tagId', async (req, res) => {
    const oneTag = await tagService.getTag(req.params.tagId);
    if(!oneTag) {
        res.status(404).send('Error: no tag found with this Id');
    } else {
        res.status(200).json(oneTag);
    }
});

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
