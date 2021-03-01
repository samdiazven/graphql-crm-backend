const { ApolloServer} = require('apollo-server');
const connection = require('./config/connection');
const typeDefs = require('./db/gql/schema');
const resolvers = require('./db/gql/resolvers');
const {getMe} = require('./db/middlewares/token');
//DB
connection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers['authorization'] || '';
    if(token) {
      try {
	const user = getMe(token);
	return {
	  user
	}
      }catch(error) {
	console.error(error);
      }
    }
  }
});

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`Server Running on ${url}`);
});
