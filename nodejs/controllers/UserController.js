const User = require('../models/User');
const axios = require('axios');

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

module.exports = {
	async index(request,response) {
		let findUsers = await User.find();
		return response.json(findUsers);
	},
	async delete(request,response) {
		req = request.params;
		let deleteUser = await User.findOneAndDelete({"_id":req.id});
		return response.json({"success":1,"result":"User removed!","deletedUser":deleteUser});
	},
	async store(request,response,next) {
		req = request.body;
		
		let findUser = await User.findOne({ "username": req.username });
		
		if(!findUser) {
			
			try {
				let gitHubUser = await axios.get('https://api.github.com/users/'+req.username);
				
				try {
					let storeUser = await User.create({
						username: req.username,
						bio: gitHubUser.data.bio,
						avatar_url: gitHubUser.data.avatar_url,
						location: req.location
					});
					return response.json({"success":1,"result":"New user added!","storedUser":storeUser});
				} catch(error) {
					return response.json({"success":0,"result":"Coordinates are wrong!","return":error});
				}

			} catch(error) {
				return response.json({"success":0,"result":"Github account not found!","return":error});
			}

			
		} else {
			return response.json({"success":0,"result":"User already exists!"});
		}
		
		
	}
}