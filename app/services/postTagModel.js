import PostTag from "../models/postTagModel.js";

export async function getPostsTags() {
    return await PostTag.findAll();
}

export async function getPostTag(postTagId) {
    return await PostTag.findByPk(postTagId);
}

export async function createPostTag(postid, tagId) {
    const newPostTag = PostTag.build({
        post_id: postid,
        tag_id: tagId
    });
    await newPostTag.save();
    return newPostTag;
}

export async function deletePostTag(postTagObject) {
    await postTagObject.destroy();
}
