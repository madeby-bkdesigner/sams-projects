let mongoose = require('mongoose');

let postsSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    topic: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: user
        }
    },
    Comments: [
        {

            type: mongoose.Schema.Types.ObjectId,
            // ref: Comment
        }
    ]
})

let posts = mongoose.model('posts', postsSchema)
module.exports = posts