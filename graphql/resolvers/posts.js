const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const auth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 }); //.find will find all
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    async getOnePost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        }
      } catch (err) {
        throw new Error("Post does not exist");
        //Log err if I want real error message - don't think I need right now
      }
    },
  },

  Mutation: {
    async createPost(_, { content }, context) {
      const user = auth(context);
      //User is valid at this point
      const newPost = new Post({
        content,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    }, //createPost

    async deletePost(_, { postId }, context) {
      const user = auth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          //TODO delete all comments on a post if a post is deleted
          await post.delete();
          return "Post deleted";
        } else {
          throw new AuthenticationError("Not your post lol");
        }
      } catch (err) {
        throw new Error(err);
      }
    }, //deletePost
  },
};
