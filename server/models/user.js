const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define our model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true, required: true },
	password: { type: String, required: true }
});
//on save hook, encrypt password
userSchema.pre('save', function(next){
	// console.log('this', this);
	//get access to the user model(instance)
	const user = this;
	bcrypt.genSalt(10, function(err, salt){
		if(err) { return next(err);}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) { return next(err);}
			user.password = hash;
			next();
		});
	});
});
userSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err) { return callback(err);}
		callback(null, isMatch);
	})
}
//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;
