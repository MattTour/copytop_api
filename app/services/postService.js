import Post from '../models/postModel.js';
import sequelize from "../database/database.js";
import { QueryTypes } from 'sequelize';

export async function getPosts() {
    return await Post.findAll();
}

export async function getPost(postId) {
    return await Post.findByPk(postId);
}

export async function getPostsWithSearch(queryParams) {
    let requestParams = "";

    for (param in queryParams) {
        if (req.query.hasOwnProperty(param)) {
            if (param == "search") {
                requestParams += `AND (p.content LIKE '${req.query[param]}' OR p.title LIKE '${req.query[param]}') `;
            } else {
                requestParams += `AND pt.id = ${param} `;
            }
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
        WHERE 0 = 0
        ${requestParams}
        ORDER BY p.created_at DESC`,
        {
            type: QueryTypes.SELECT
        }
    );
    return posts;
}

export async function createPost(title, content) {
    const newPost = Post.build({
        title: title,
        content: content
    });
    await newPost.save();
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
