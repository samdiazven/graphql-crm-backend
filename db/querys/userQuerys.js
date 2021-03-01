const User = require('../models/User')


const getUsers = async () => {

	const users = await User.find({role: 'SELLER'});

	return users

}

const getUser = async id => {
	
	const user = await User.findById(id);

	if(!user) throw new Error('Usuario no existe')

	return user
}


module.exports = {
	getUsers,
	getUser
}