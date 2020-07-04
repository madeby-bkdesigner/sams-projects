let log = console.log;
let express = require('express'),
    router = express.Router()

let posts = require('../models/posts');
    
router.get('/admin', (req, res) => {
    posts.find({}, (err, posts) => {
        if (err) {
            log(err)
        } else {
            res.render('./admin/main-admin', {posts, posts})
        }
    })
})

router.post('/', (req, res) => {
    let title = req.body.title
    let image = req.body.image
    let body = req.body.body
    let topic = req.body.topic
    let newPost = {title:title, image: image, body:body, topic: topic}

    posts.create(newPost, (err, newpost) => {
        if (err) {
            log(err)
        } else {
            log(newpost)
            res.redirect('/admin')
        }
    })

})

module.exports = router