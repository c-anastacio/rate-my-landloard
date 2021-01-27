const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    content: String,
    username: String,
    createdAt: String,
    comments: [
        {
            content: String,
            username: String,
            createdAt: String
        }
    ],
    upvote: [
        {
            username: String,
            createdAt: String
        }
    ],
    //Helps us later because Mongo is schemaless, build relations with ORM
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);