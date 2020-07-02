let mongoose = require('mongoose');

let postsSchema = new mongoose.Schema({
    image: String,
    name: String,
    desc: String,
    category: String,
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