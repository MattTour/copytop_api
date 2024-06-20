import Post from '../models/postModel.js';
import sequelize from "../database/database.js";
import { QueryTypes } from 'sequelize';
import { sendNotification } from './pushService.js';

export async function getPosts() {
    return await Post.findAll();
}

export async function getPost(postId) {
    return await Post.findByPk(postId);
}

export async function getPostsWithSearch(queryParams) {
    let requestParams = "";

    for (let param in queryParams) {
        if (param == "search") {
            requestParams += `AND (p.content LIKE '%${queryParams[param]}%' OR p.title LIKE '%${queryParams[param]}%') `;
        } else {
            requestParams += `AND t.id = ${param} `;
        }
    }

    const posts = await sequelize.query(
        `SELECT
        p.id as postId,
        p.title as postTitle,
        p.content as postContent,
        p.created_at as postDate
        FROM POSTS p
        LEFT JOIN POSTS_TAGS pt on pt.post_id = p.id
        LEFT JOIN TAGS t on t.id = pt.tag_id
        WHERE 0 = 0
        ${requestParams}
        GROUP BY p.id
        ORDER BY p.created_at DESC`,
        {
            type: QueryTypes.SELECT
        }
    );
    return posts;
}

export async function createPost(title, content, tags) {
    const newPost = Post.build({
        title: title,
        content: content
    });
    await newPost.save();

    let tagsInsert = '';

    tags = tags.split(',');

    if (tags && tags.length > 0) {
        tags.forEach(tag => {
            tagsInsert += ` (${newPost.id}, ${tag}),`;
        });

        tagsInsert = tagsInsert.slice(0, -1);

        await sequelize.query(
            `INSERT INTO POSTS_TAGS (post_id, tag_id)
            VALUES
            ${tagsInsert};`,
            {
                type: QueryTypes.INSERT
            }
        );
    }

    sendNotification('New post uploaded', 'Click to check');
    return newPost;
}

export async function updatePost(postObject, title, content) {
    postObject.title = title;
    postObject.content = content;
    await postObject.save();
    return postObject;
}

export async function deletePost(postObject) {
    await postObject.destroy();
}
