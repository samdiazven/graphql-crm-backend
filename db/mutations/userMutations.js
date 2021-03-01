const User = require('../models/User');
const bcryptjs = require('bcryptjs');
require('dotenv').config({path: 'variables.env'});
const {createToken} = require('../middlewares/token');


const createUser =  async (input) => {
  const {email, password} = input;
  const userExist = await User.findOne({email});
  if(userExist) {
    throw new Error('User exist');
  }
  const salt = await bcryptjs.genSalt(10);
  input.password = await bcryptjs.hash(password, salt);
  try {
    const user = new User(input);
    user.save();
    return user;
  }catch(error) {
    console.log(error);
  }
}

const loginUser = async (input) => {
  const {email, password} = input;

  const userExist = await User.findOne({email});
  if(!userExist) {
    throw new Error('Usuario no existe');
  }
  const correctPassword = await bcryptjs.compare(password, userExist.password);
  if(!correctPassword) {
    throw new Error('Password Incorrecto');
  }
  return {
    token: createToken(userExist, process.env.SECRET, '24h')
  }
}

const updateUser = async (id, input, ctx) => {
  const userExist = await User.findById(id);
  
  if(!userExist) throw new Error('Usuario no Encontrado');

  if(ctx.user.role !== 'ADMIN') throw new Error('No tienes los permisos necesarios');

  try {
    const newUser = await User.findByIdAndUpdate(id, input, {new: true});

    return newUser;
  }catch(err) {
    console.error(err)
  }
  
}

const deleteUser = async (id, ctx) => {
  const userExist = await User.findById(id);
  
  if(!userExist) throw new Error('Usuario no Encontrado');

  if(ctx.user.role !== 'ADMIN') throw new Error('No tienes los permisos necesarios');

  try {
    await User.findOneAndDelete(id)
    return 'Usuario eliminado correctamente'
  }catch(error) {
    console.error(error)
  }

}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser
}
