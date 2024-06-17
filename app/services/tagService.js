import Tag from "../models/tagModel.js";

export async function getTags() {
    return await Tag.findAll();
}

export async function getTag(tagId) {
    return await Tag.findByPk(tagId);
}

export async function createTag(tagName) {
    const newTag = Tag.build({
        name: tagName
    });
    await newTag.save();
    return newTag;
}

export async function updateTag(tagObject, tagName) {
    tagObject.name = tagName;
    await tagObject.save();
    return tagObject;
}

export async function deleteTag(tagObject) {
    await tagObject.destroy();
}
