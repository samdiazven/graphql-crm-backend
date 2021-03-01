const Client = require('../models/CLients');

const getClients = async () => {
  const clients = await Client.find().populate('seller');

  return clients;
}
const getClientsBySeller = async idSeller => {
  const clients = await Client.find({seller: idSeller.toString()});

  return clients;
}

const getCLient = async(id, ctx) => {
  const client = await Client.findById(id);

  if(!client) throw new Error('Cliente no existe');

  if(client.seller.toString() !== ctx.user.id) throw new Error('No tienes las credenciales necesarias');

  return client;
}


module.exports = {
  getClients,
  getClientsBySeller,
  getCLient
}
