const passport = require('passport'); 
const FacebookStrategy = require("passport-facebook").Strategy

passport.serializeUser((user , done) => { 
	done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
	done(null, user); 
}); 


passport.use(new FacebookStrategy({
    clientID: "910200820816838",
    clientSecret: "f025fa22bc8f9ef53fce9b54d2724f35",
    callbackURL: 'http://localhost:3000/auth/callback',
    // state: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
    }, function verify(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        cb(profile,null)
    }
    ));