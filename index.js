const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

//Each mutation or req needs a resolver
const resolvers = {
    Query:{
        sayHi: () => "Hello World!"
    }
}

//takes in typedefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port: 5000 })
.then(res => {
    console.log(`Server running on port ${res.url}`)
})
