const Product = require('../models/Products');

const createProduct = async input => {
  try {
    const product = new Product(input);

    const res = await product.save();
  
    return res;
  }catch(error) {
    console.log(error);
   }
}

const updateProduct = async(id, input) => {

  const productExist = await Product.findById(id);
  if(!productExist) throw new Error('Producto no encontrado');

  try {
    const product = await Product.findByIdAndUpdate(id, input, {new: true} );

    return product;
  }catch(error) {
    console.log(error);
  }
}
const deleteProduct = async id => {

   const productExist = await Product.findById(id);
  if(!productExist) throw new Error('Producto no encontrado');

  await Product.findByIdAndDelete(productExist.id);

  return `Producto con el id ${productExist.id} Eliminado`;
}
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct
}
