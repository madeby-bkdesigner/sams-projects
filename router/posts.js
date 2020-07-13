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
    let idc = {'_id': -1}
    posts.find().sort(idc).limit(6).exec((err, mainpost)=>{
        if(err){
            log(err)
        }else{
            posts.find().sort({'_id': -1}).limit(3).exec((err, post)=>{
                if(err){
                    log(err)
                }else{
                    res.render('./html-pages/home', {mainpost: mainpost, posts: post})
                }
            })
        }
    })
    
    
})


/// show desc
router.get('/readmore/:id', (req, res) => {
    posts.find().sort({'_id': -1}).limit(6).exec((err, post)=>{
            if(err){
                log(err)
            }else{
                
                posts.findById(req.params.id, (err, foundPost)=>{
                    if(err){
                        log(err)
                    }else{
                        if(foundPost.topic == 'animals' || foundPost.topic == 'environment' || foundPost.topic == 'physics' || foundPost.topic == 'body & health'){
                            res.render('./html-pages/showdesc', {
                                foundPost: foundPost, 
                                posts: post,
                                topicLink: 'science&nature'
    
                            })
                        }else if(foundPost.topic == 'historic events' || foundPost.topic == 'people & civilization'){
                            res.render('./html-pages/showdesc', {
                                foundPost: foundPost, 
                                posts: post,
                                topicLink: 'history'
                            })
                        }
                        else{
                            res.render('./html-pages/showdesc', {
                                foundPost: foundPost, 
                                posts: post,
                                topicLink: 'entertainment'
                            })
                        }
                    }
                })
            }
        })
})

router.
route('/science&nature')
.get((req,res)=>{
 
    posts.find({$or:[{topic:'animals'}, {topic:'environment'}, {topic:'physics'}, {topic:'body & health'} ]}, (err, mainPosts)=>{
        if(err){
            log(err)
        }else{
            posts.find({topic: req.params.id}, (err, postLinks)=>{
                if(err){
                    log(err)
                }else{
                    res.render('./html-pages/scienceandnature', {
                        posts: mainPosts,
                        postLinks: postLinks
                    })
                }
            })
        }
    })
})

router.
route('/science&nature/:id')
.get((req, res)=>{
    posts.find({topic: req.params.id}, (err, posts)=>{
        if(err){
            log(err)
        }else{
            res.render('./topics/scienceandnature', {
                posts: posts,
                title: req.params.id
            })
        }
    })
})

//entertainment
router.
route('/entertainment')
.get((req,res)=>{
    posts.find({$or:[{topic: 'funfacts'}, {topic: 'movies & shows'}, {topic: 'technology'}, {topic: 'sports & games'}]}, (err, posts)=>{
        if(err){
            log(err)
        }else{
            res.render('./html-pages/entertainment', {posts: posts})
        }
    })
})

router.
route('/entertainment/:id')
.get((req, res)=>{
    posts.find({topic: req.params.id}, (err, posts)=>{
        if(err){
            log(err)
        }else{
            if(posts == ''){
                req.flash('error', 'sorry this link is currently empty. will be posting content here soon')
                return res.redirect('back')
            }else{
                res.render('./topics/entertainment', {
                    posts: posts,
                    title: req.params.id
                })
            }
        }
    })
})

//history
router.
route('/history')
.get((req,res)=>{
    posts.find({$or:[{topic: 'historic events'}, {topic: 'people & civilization'}]}, (err, posts)=>{
        if(err){
            log(err)
        }else{
            res.render('./html-pages/history', {posts: posts})
        }
    })
})

router.
route('/history/:id')
.get((req, res)=>{
    posts.find({topic: req.params.id}, (err, posts)=>{
        if(err){
            log(err)
        }else{
            res.render('./topics/history', {
                posts: posts,
                title: req.params.id
            })
        }
    })
})

// contact
router.
route('/contact')
.get((req, res)=>{
    res.render('./html-pages/contact')
})
module.exports = router