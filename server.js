const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const session = require("express-session");
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
app.set('trust proxy', 1) 
app.use(session({
  secret: `${SECT_SRECT}`, 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', async (req, res) => {
  await res.send('<a href="/auth/google">Authenticate with google</a>');
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
