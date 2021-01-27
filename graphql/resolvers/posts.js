const Post = require('../../models/Post')

module.exports = {
    Query:{
        async getPosts(){
            try{
                const posts = await Post.find();//.find will find all
                return posts;
            }catch (err) {
                console.log(err);
            }
        }
    }
}