require('dotenv').config()
let log = console.log;

let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStragety = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),ap
    app = express();

    // import Routes
let postsRoute = require('./router/posts')
let adminRouter = require('./router/admin')
let userRoute = require('./router/user')
    //import models
let posts = require('./models/posts');
let user = require('./models/user')

    // Conntect to database
mongoose.connect(process.env.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true,

}).then(()=>{
    log('Connected to the db')
}).catch(err=>{
    log('ERROR: ', err.message)
})


    // app config
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

// passport authentication
app.use(
    require('express-session')({
        secret: 'sams project',
        resave: false,
        saveUninitialized: false
    })
)


// passport config
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStragety( user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())


// middleWare for nav bar links
app.use((req, res, next) => {
    res.locals.currentuser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();
});

    //////////////////////////////

    //////////////////////////////

    // using routes
app.use(postsRoute)
app.use(adminRouter)
app.use(userRoute)


    // redirecting wrong urls
app.get('*', (req, res) => {
    res.render('404');
})

    // set the port

let port = process.env.PORT || 3001;
let host = '0.0.0.0'
app.listen(port,host, () => {
    log('server started on ' + port)
})



