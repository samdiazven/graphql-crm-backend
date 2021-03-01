const {createUser, loginUser, updateUser, deleteUser} = require('../mutations/userMutations');
const {getMe} = require('../middlewares/token');
const {createProduct, updateProduct, deleteProduct} = require('../mutations/productsMutation');
const {createClient, updateClient, deleteClient} = require('../mutations/clientMutations');
const {createOrder, updateOrder, deleteOrder} = require('../mutations/orderMutations');
const {getProducts, getProduct} = require('../querys/productsQuerys');
const {getClients, getClientsBySeller, getCLient} = require('../querys/clientQuerys');
const {getOrder, getOrders, getOrdersBySeller, getOrdersByStatus, getOrdersByStatusAdmin} = require('../querys/orderQuerys');
const {bestClients, bestSellers, searchProducts} = require('../querys/searchQuerys');
const {getUsers, getUser} = require('../querys/userQuerys');

const resolvers = { 
  Query: {
    getActualUser: (_, {}, ctx) => {
      return ctx.user;
    },
    getProducts: () => {
      const products = getProducts();
      return products;
    },
    getProduct: (_, {id}) => {
      const product = getProduct(id);
      return product;
    },
    getClients: () => {
      const clients = getClients();
      return clients;
    },
    getClientsBySeller: (_, {}, ctx) => {
      const clientsSeller = getClientsBySeller(ctx.user.id);
      return clientsSeller;
    },
    getClient: (_, {id}, ctx) => {
      const client = getCLient(id, ctx);
      return client;
    },
    getOrders: () => {
      const orders = getOrders();
      return orders;
    },
    getOrder: (_, {id}, ctx) => {
      const order = getOrder(id, ctx);
      return order;
    },
    getOrdersBySeller: (_, {}, ctx) => {
      const orders = getOrdersBySeller(ctx.user.id);
      return orders;
    },
    getOrdersByStatusAdmin: (_, {status}) => {
      const orders = getOrdersByStatusAdmin(status);
      return orders;
    },
    getOrdersByStatus: (_, {status}, ctx) => {
      const orders = getOrdersByStatus(status, ctx);
      return orders;
    },
    bestClients: () => {
      const clients = bestClients();
      return clients;
    },
    bestSellers: () =>{
      const sellers =  bestSellers();
      return sellers;
    },
    searchProducts: (_, {text}) => {
      const products = searchProducts(text);
      return products;
    },
    getUsers: () => {
      const users = getUsers();
      return users
    },
    getUser: (_, {id}) => {
      const user = getUser(id);
      return user
    }
  },
  Mutation: {
    newUser: (_, {input}) => {
      const user = createUser(input);
      return user;
    }, 
    loginUser: (_, {input}) => {
      const token = loginUser(input);
      return token;
    },
    newProduct: (_, {input}) => {
      const product = createProduct(input);
      return product;	
    },
    updateProduct: (_, {id, input}) => {
      const newProduct = updateProduct(id, input);
      return newProduct;
    },
    deleteProduct: (_, {id}) => {
      return deleteProduct(id);
    },
    newClient: (_, {input}, ctx) => {
      const newClient = createClient(input, ctx);
      return newClient;
    },
    updateClient: (_, {id, input}, ctx) => {
      const newClient = updateClient(id, input, ctx);
      return newClient;
    },
    deleteClient: (_, {id}, ctx) => {
      return deleteClient(id, ctx);
    },
    newOrder: (_, {input}, ctx) => {
      const order = createOrder(input, ctx);
      return order;
    },
    updateOrder: async (_, {id, input}, ctx) => {
      console.log('input', input)
      const order = await updateOrder(id, input, ctx);
      console.log('order', order)
      return order;
      
    },
    deleteOrder: (_, {id}, ctx) => {
      return deleteOrder(id, ctx);
    },
    updateUser: async (_, {id, input}, ctx) => {
      const order = await updateUser(id, input, ctx);
      return order;
    },
    deleteUser: async (_, {id}, ctx) => {
      const msg = await deleteUser(id, ctx)
      return msg;
    }
  }
}

module.exports = resolvers;
