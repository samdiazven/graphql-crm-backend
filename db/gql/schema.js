const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    id: ID
    name: String
    lastname: String
    email: String
    created: String
    role: String
  }

  type Token {
    token: String
  }
  
  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    created: String
  }
  type Client {
    id: ID
    name: String
    lastname: String
    tlf: String
    company: String
    seller: ID
    email: String
  }

  type ClientAdmin {

    id: ID
    name: String
    lastname: String
    tlf: String
    company: String
    seller: User
    email: String
  }

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: Client
    seller: ID
    created: String
    status: StatusOrder
  }

  type OrderGroup {
    id: ID!
    quantity: Int
    name: String
    price: Float
  }

  type TopClient {
    total: Float
    client: [Client]
  }

  type TopSeller {
    total: Float
    seller: [User]
  }

  input userInput {
    name: String!
    lastname: String!
    email: String!
    password: String
    role: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
  
  input productInput {
    name: String!
    stock: Int!
    price: Float!
  }

  input clientInput {
    name: String!
    lastname: String!
    company: String!
    tlf: String
    email: String!
    
  }
  input OrderProductInput {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    status: StatusOrder


  }

  enum StatusOrder {
    PENDIENTE
    COMPLETADO
    CANCELADO
  }

  type Query{
    #Users
    getActualUser: User
    getUsers: [User]
    getUser(id: ID!): User

    #Products
    getProducts: [Product]
    getProduct(id: ID!) : Product

    #Clients
    getClients: [ClientAdmin]
    getClientsBySeller: [Client]
    getClient(id: ID!): Client
    
    #Orders
    getOrders: [Order]
    getOrder(id: ID!): Order
    getOrdersBySeller: [Order]
    getOrdersByStatusAdmin(status: String!): [Order]
    getOrdersByStatus(status: String!): [Order]

     #Advanced searches
     bestClients: [TopClient]
     bestSellers: [TopSeller]
     searchProducts(text: String!): [Product]
  }

  type Mutation {
    # User
    newUser(input: userInput) : User
    loginUser(input: loginInput): Token
    updateUser(id: ID!, input: userInput): User
    deleteUser(id: ID!): String

    #Products
    newProduct(input: productInput)  : Product
    updateProduct(id: ID!, input: productInput) : Product
    deleteProduct(id: ID!) : String

    #Clients
    newClient(input: clientInput) : Client
    updateClient(id: ID!, input: clientInput) : Client
    deleteClient(id: ID!) : String

    #Orders
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): String

   
  }
    
`;

module.exports = typeDefs;
