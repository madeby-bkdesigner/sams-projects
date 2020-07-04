let log = console.log;
let express = require('express'),
    router = express.Router(),
    async = require('async');

// models
let posts = require('../models/posts')

    // Routes

    // home
router.get('/', (req, res) => {
    posts.find({}, (err, post) => {
        if (err) {
            log(err)
        } else {
            res.render('./html-pages/home', { posts: post })
        }
    })
})


/// show desc
router.get('/readmore/:id', (req, res) => {
    posts.findById(req.params.id, (err, foundPost) => {
        if (err || !foundPost) {
            log(err)
        } else {
            res.render('./html-pages/showdesc',  {foundPost: foundPost})
        }
    })
})


module.exports = router