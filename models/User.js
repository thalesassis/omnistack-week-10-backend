const mongoose = require('mongoose');
const PointSchema = require('./Point');

mongoose.set('useCreateIndex', true);
const UserSchema = new mongoose.Schema({
	username: String,
	bio: String,
	avatar_url: String,
	techs: Array,
	location: {
		type: PointSchema,
		index: '2dsphere'
	}
});

module.exports = mongoose.model('User',UserSchema);