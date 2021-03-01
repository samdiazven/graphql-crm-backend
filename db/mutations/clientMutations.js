const Client = require('../models/CLients');

const createClient = async (input, ctx) => {
  const {email} = input;
  const clientExist = await Client.findOne({email});

  if(clientExist) throw new Error('El Cliente ya esta registrado');

  const newClient = new Client(input);

  newClient.seller = ctx.user.id;

  try {
    const res = await newClient.save();
    return res;
  }catch(err) {
    console.error(err);
  }
  
}

const updateClient = async (id, input, ctx) => {

  const existClient = await Client.findById(id);
  if(!existClient) throw new Error('El Cliente no se pudo encontrar');

  if(existClient.seller.toString() !== ctx.user.id) throw new Error('No tienes las credenciales necesarias');

  const newClient = await Client.findByIdAndUpdate(id, input, {new: true});

  return newClient;
}
const deleteClient = async(id, ctx) => {
   const existClient = await Client.findById(id);
  if(!existClient) throw new Error('El Cliente no se pudo encontrar');

  if(existClient.seller.toString() !== ctx.user.id) throw new Error('No tienes las credenciales necesarias');
  try{
    await Client.findByIdAndDelete(id);

    return "Cliente Eliminado Sastifactoriamente";
  }catch(err) {
    console.error(err);
  }

}
module.exports = {
  createClient,
  updateClient,
  deleteClient
}
