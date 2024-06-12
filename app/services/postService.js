import post from '../models/postModel.js';

export async function getPosts() {
    return await post.findAll();
}

export async function getPost(postId) {
    return await post.findByPk(postId);
}

export async function createPost(title, content) {
    const newPost = post.build({
        title: title,
        content: content
    });
    await newPost.save();
    return newPost;
} 

export async function updatePost(postId, title, content) {
    let postObject = await getPost(postId);
    postObject.title = title;
    postObject.content = content;
    postObject.save();
    return postObject;
} 

export async function deletePost(postId) {
    let postObject = await getPost(postId);
    if(!postObject) {
        return false
    }
    await postObject.destroy();
    return true;
}
