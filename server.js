const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./auth/oauth.js');

// Middleware
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}


const port = process.env.PORT || 3000;
const SECT_SRECT = process.env.SECTION_SRECT
const app = express();

//Express-session

// var sess = {
//   secret: `${SECT_SRECT}`,
//   resave: false, 
//   saveUninitialized: true,
//   cookie: {}
// }
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 30) // trust first proxy
//   sess.cookie.secure = false // serve secure cookies
// }
// app.use(session(sess))
app.use(session({
  secret: `${SECT_SRECT}`,
  saveUninitialized: true, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_API_KEY,
    touchAfter: 24 * 3600 // time period in seconds
  })
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
   res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/user',
        failureRedirect: '/google/failure'
}));

app.get('/google/failure', (req, res) => {
  res.send('Something went wrong with the authetication...');
});


app.use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', isLoggedIn, require('./routes'));

  // LogOut
  app.get('/logout',  (req, res) => {
    req.session.destroy();
    res.send('Goodbye! you have logout.');
    res.redirect('/');
});

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect database!', err);
    process.exit();
  });
