const Product = require('../models/Products');
const Order = require('../models/Order');

const bestClients = async() => {
  const clients = await Order.aggregate([
    {$match: {status: "COMPLETADO"}},
    { $group: {
      _id : "$client",
      total: {$sum: '$total'}
    }},
    {
      $lookup: {
	from: 'clients',
	localField: '_id',
	foreignField: "_id",
	as: "client"
      }
    },
    {
      $sort: { total : -1 }
    }
  ]);
  return clients;
}

const bestSellers = async () => {
  const sellers = await Order.aggregate([
    {$match: { status: "COMPLETADO" }},
    {$group: {
      _id: "$seller",
      total: {$sum: "$total"}
    }},
    {
      $lookup: {
      	from: 'users',
      	localField: '_id',
      	foreignField: '_id',
      	as: "seller"
      }
    },
    {
      $limit: 3
    },
    {
      $sort: { total : -1 }
    }
  ]);

  return sellers;
}
const searchProducts = async text => {
  const products = await Product.find({$text: {$search: text}}).limit(30);
  return products;
}

module.exports = {
  bestClients,
  bestSellers,
  searchProducts
}
