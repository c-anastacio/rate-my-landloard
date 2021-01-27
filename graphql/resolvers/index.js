const postsResolvers = require('./posts');
const userResolvers = require('./users');

module.exports = {
    //Spread Operator will give everything
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation
    }
};