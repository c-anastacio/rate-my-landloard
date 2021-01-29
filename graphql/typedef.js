const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    content: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    upvotes: [Upvotes]!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    content: String!
  }
  type Upvotes {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getOnePost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User!
    createPost(content: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    createUpvote(postId: ID!): Post!
  }
`;
