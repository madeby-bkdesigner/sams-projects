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

//admin
router.get('/admin', (req, res) => {
    res.render('./html-pages/admin')
})

router.post('/', (req, res) => {
    let image = req.body.image
    let name = req.body.name;
    let category = req.body.category
    let desc = req.body.desc
    
    let newPost = { image: image, name: name, category: category, desc: desc };

    posts.create(newPost, (err, newPost) => {
        if (err) {
            log(err)
        } else {
            log(newPost)
            res.redirect('/')
        }
    })
})

/// show desc
router.get('/readmore/:id', (req, res) => {
    posts.find(req.params.id, (err, foundPost) => {
        if (err || !foundPost) {
            log(err)
        } else {
            res.render('./html-pages/showdesc'; {foundPost})
        }
    })
})


module.exports = router