require('dotenv').config();
const express = require('express');
const session = require('express-session');
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');

const app = express();

app.use(session({
    secret: 'lolmao',
    resave: false,
    saveUninitialized: false
}))

app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/login',
    scope: 'open id profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    done(null, profile)
}))




const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );