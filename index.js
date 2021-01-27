const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers');
const { MONGODB, APPDB, PORT } = require('./config.js');


//takes in typedefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers
})

//Asyncs are easier than chained thens 
const loadDB = async () => {
  try {
    console.log("New Connection");
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.log(err);
  }
};

const serverConnect = async () => {
    try {
        console.log(`Server Connected to port ${PORT}`)
        server.listen({port: PORT})
    } catch (err) {
      console.log(err);
    }
  };

loadDB();
serverConnect();



