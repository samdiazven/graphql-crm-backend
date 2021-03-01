const Product = require('../models/Products');

const getProducts = async () => {
  
  const products = await Product.find();

  return products;

}

const getProduct = async idProduct => {
  const product = await Product.findById(idProduct);

  if(!product) throw new Error('El producto no pudo ser procesado ');

  return product;
}

module.exports = {
  getProducts,
  getProduct
}
