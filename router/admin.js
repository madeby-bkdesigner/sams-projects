let log = console.log;
let express = require('express'),
    router = express.Router()

let posts = require('../models/posts');
let user = require('../models/user')
let middleware = require('../middleware/index');
const { rejectSeries } = require('async');

router.get('/admin/managepost', middleware.isLoggedIn, (req, res) => {
    posts.find({}, (err, posts) => {
        if (err) {
            log(err)
        } else {
            res.render('./admin/managepost', {posts: posts})
        }
    })
})
                                                /// add post manage post section
router.post('/', (req, res) => {
    let title = req.body.title
    let image = req.body.image
    let body = req.body.body
    let topic = req.body.topic
    let date = req.body.date
    let newPost = {title:title, image: image, body:body, topic: topic, date: date}

    posts.create(newPost, (err, newpost) => {
        if (err) {
            log(err)
        } else {
            res.redirect('/admin/managepost')
        }
    })

})

//edit
router.get('/edit/:id', (req, res)=>{
    posts.findById(req.params.id, (err, post)=>{
        if(err){
            log(err)
        }else{
            res.render('./admin/edit', {post: post})
        }
    })
})

router.put('/readmore/:id',(req, res)=>{
    posts.findByIdAndUpdate(req.params.id, req.body, (err, updatedpost)=>{
        if(err){
            log(err)
        }else{
            log(updatedpost)
            res.redirect('/readmore/' + req.params.id)
        }
    })
} )

// delete
router.delete('/readmore/:id', (req, res)=>{
    posts.findByIdAndDelete(req.params.id, (err, removedpost)=>{
        if(err){
            log(err)
        }else{
            res.redirect('/')
        }
    })
})

//manage user
router.
route('/admin/manageuser')
.get(middleware.isLoggedIn,(req, res)=>{
    user.find({}, (err, user)=>{
        if(err){
            log(err)
        }else{
            res.render('./admin/manageuser', {user:user})
        }
    })
})


// user data
router.
route('/admin/userdata/:id')
.get(middleware.isLoggedIn, (req, res)=>{
    user.findById(req.params.id, (err, user)=>{
        if(err){
            log(err)
        }else{
            res.render('./admin/userdata', {user:user})
        }
    })
})

router.
route('/admin/userdata/:id')
.put((req, res)=>{
    user.findByIdAndUpdate(req.params.id, req.body, (err, updateduser)=>{
        if(err){
            log(err)
        }else{
            log(updateduser)
            res.redirect('/admin/manageuser')
        }
    })
})
module.exports = router