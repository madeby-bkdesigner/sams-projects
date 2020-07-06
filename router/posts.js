let log = console.log;
let express = require('express'),
    router = express.Router(),
    async = require('async');

// models
let posts = require('../models/posts');
const { route } = require('./admin');

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
        posts.find({}, (err, post)=>{
            if(err){
                log(err)
            }else{
                posts.findById(req.params.id, (err, foundPost)=>{
                    if(err){
                        log(err)
                    }else{
                        res.render('./html-pages/showdesc', {foundPost: foundPost, posts: post})
                    }
                })
            }
        })
})

router.
route('/science&nature')
.get((req,res)=>{
    posts.find({topic:'science'}, (err, posts)=>{
        if(err){
            log(err)
        }else{
            res.render('./html-pages/sub-nav', {posts: posts})
        }
    })
})

router.
route('/science&nature/:id')
.get((req, res)=>{
    res.send(req.params.id + ' yayyyyy')
})
module.exports = router