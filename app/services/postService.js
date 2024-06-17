import Post from '../models/postModel.js';

export async function getPosts() {
    return await Post.findAll();
}

export async function getPost(postId) {
    return await Post.findByPk(postId);
}

export async function createPost(title, content) {
    const newPost = Post.build({
        title: title,
        content: content
    });
    await newPost.save();
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
