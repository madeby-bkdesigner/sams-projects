require('dotenv').config()
let log = console.log;

let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

    // import Routes
let postsRoute = require('./router/posts')
    //import models
let posts = require('./models/posts')

    // Conntect to database
mongoose.connect('mongodb://localhost/sams', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    // app config
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


    //////////////////////////////

    //////////////////////////////

    // using routes
app.use(postsRoute)


    // redirecting wrong urls
app.get('*', (req, res) => {
    res.send('oops you came to the wrong page');
})

    // set the port

let port = 3000;

app.listen(port, () => {
    log('server started on ' + port)
})



