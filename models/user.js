const { mongo } = require("mongoose");

let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose');
const passport = require("passport");


let userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, require: true},
    username: {type: String, unique: true, require: true} ,
    role: String,
    password: String,
    // passwordConfirm: String,
})

userSchema.plugin(passportLocalMongoose)

let user = mongoose.model('user', userSchema)
module.exports = user