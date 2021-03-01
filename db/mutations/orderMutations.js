const Order = require('../models/Order');
const Client = require('../models/CLients');
const Product = require('../models/Products');


const createOrder = async (input, ctx) => {
  const clientExist = await Client.findById(input.client);

  if(!clientExist) throw new Error('No se encuentra el cliente');
  

  if(clientExist.seller.toString() !== ctx.user.id) throw new Error('No tiene las credenciales para este usuario');
  
  for await (const article of input.order) {
    const {id} = article;

    const product = await Product.findById(id);
    
    if(article.quantity > product.stock) {

      throw new Error(`El producto ${product.name} excede la cantidad en stock`);
    }else {
      product.stock = product.stock - article.quantity;
      await product.save();
    }


  }


  const newOrder = new Order(input);

  newOrder.seller = ctx.user.id;

  try {
   const res = await newOrder.save();

   const getOrder = await Order.findById(res.id).populate('client');

   return getOrder;


  }catch(error) {
    console.log(error)
  }
  
 
}
const updateOrder = async (id, input, ctx) => {
  const orderExist = await Order.findById(id);

  if(!orderExist) throw new Error('Pedido no existe');

  const clientExist = await Client.findById(input.client);

  if(!clientExist) throw new Error('Cliente no existe');
  
  try{
  const res = await Order.findByIdAndUpdate(id, input, {new: true}).populate('client');
  return res;
  }catch(err) {

    console.error(err);
  }
}
const deleteOrder = async (id, ctx) => {
  const orderExist = await Order.findById(id);
  if(!orderExist) throw new Error('Pedido no existe');
  if(orderExist.seller.toString() !== ctx.user.id) throw new Error('No tienes las credenciales para realizar este proceso');

  try{ 
    await Order.findByIdAndDelete(id);
    return "Pedido Eliminado";
  } catch(err) {
    console.error(err);
  }
}
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder
}
