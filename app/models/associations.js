import Post from "./postModel.js";
import Tag from "./tagModel.js";
import PostTag from "./postTagModel.js";
import Push from "./pushModel.js";
import User from "./userModel.js";

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

    User.hasOne(Push, {
        foreignKey: {
            name: 'user_id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
}
