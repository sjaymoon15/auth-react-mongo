const User = require('../models/user');

exports.signup = function(req, res, next){
	const email = req.body.email;
	const password = req.body.password;
	
	if(!email|| !password){
		return res.status(422).send({ error: "You must provide email and password" });
	}
	// see if a user with the given email exists
	User.findOne({ email: email }, function(err, existingUser){
		if(err){ return next(err);}

		// if a user with email does exist, return an err
		if(existingUser){
			return res.status(422).send({ error: 'Email is in use' });
		}
		// if not, create and save user record
		const user = new User({
			email: email,
			password: password
		});	
		// user.save(function(err){
		// 	if(err){ return next(err);}
		// 	res.json(user);
		// });
		user.save()
		.then(user => res.json({ success: true }));
		// respond to req indicating the user was created.
	});
	

}