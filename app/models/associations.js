import Post from "./postModel.js";
import Tag from "./tagModel.js";
import PostTag from "./postTagModel.js";

export const configure = () => {
    Post.hasMany(PostTag, {
        foreignKey: {
            name: 'post_id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    Tag.hasMany(PostTag, {
        foreignKey: {
            name: 'tag_id',
        }, 
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
}
