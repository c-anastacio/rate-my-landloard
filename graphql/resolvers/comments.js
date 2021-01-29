const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const auth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, content }, context) {
      const { username } = auth(context);
      if (content.trim() == "") {
        throw new UserInputError("Empty Comment");
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          content,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw UserInputError("Post not available");
      }
    }, //createComment

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = auth(context);

      const post = await Post.findById(postId);
      if (post) {
        const comment = post.comments.findIndex(
          (comm) => comm.id === commentId
        );
        if (post.comments[comment].username === username) {
          post.comments.splice(comment, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Not allowed lol");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }, //deleteComment
  },
};
