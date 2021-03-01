const Order = require('../models/Order');

const getOrders = async () => {

  const order = await Order.find().populate('client');

  return order;
}
const getOrder = async id => {
  const orderExist = await Order.findById(id).populate('client');

  if(!orderExist) throw new Error('No se encuentra la orden');

  return orderExist;
}

const getOrdersBySeller = async idSeller => {
  try{
    const orders = await Order.find({seller: idSeller.toString()}).populate('client');
    return orders;
  }catch(err) {
    console.error(err);
  }

}

const getOrdersByStatusAdmin = async (status) => {
  const orders = await Order.find({status: status});
  return orders;
}

const getOrdersByStatus= async (status, ctx) => {
  const orders = await Order.find({status, seller: ctx.user.id});
  return orders;
}
module.exports = {
  getOrders,
  getOrder,
  getOrdersBySeller,
  getOrdersByStatusAdmin,
  getOrdersByStatus
}
