let log = console.log
let posts = require('../models/posts')

let middlewareObj = {}

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error', 'please login here first')
    res.redirect('/login')
}

module.exports = middlewareObj