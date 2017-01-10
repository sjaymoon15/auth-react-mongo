//we want to know if user loggedin before we hit controllers
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
//strategy is a method for authenticating user
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy 
const localOptions = { usernameField : 'email'};
const localLogin = new LocalStrategy( localOptions , function(email, password, done){
	//verify this email and password, call done with the user
	//if correct email and password
	//otherwise, call done with false
	User.findOne({ email: email}, function(err, user){
		if(err) { return done(err);}
		if(!user) { return done(null, false);}
		// compare passwords - is 'password' from request equal to user.password in db?
		user.comparePassword(password, function(err, isMatch){
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false);}
			return done(null, user); //passport assigns user to req.user here
		})
	})
});
//setup options for jwt strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};
//create jwt strategy
//payload is decoded jwt token { sub: , iat: }..
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// see if the userId in the payload exists in our database
	// if so, call 'done ' with that user
	// otherwise, call done without a user object
	User.findById(payload.sub, function(err, user){
		if(err) { return done(err, false); }
		if(user) { done(null, user); }
		else{	done(null, false); }
	})
});
//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);