// repositories/posts.repository.js

const { Posts } = require('../models');

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();

    return posts;
  }

  findOnePost = async (postId) => {
    //postId로 포스트를 찾아 반환해주는 함수
    const post = await Posts.findOne({
        where : {postId}
    });
    return post
  }

  createPost = async (nickname, password, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({ nickname, password, title, content });

    return createPostData;
  }

  updatePost = async (postId,title ,content) => {
    const updatePostData = await Posts.update({
    //postId로 게시물을 찾아 수정해주는 기능
        title, content
    }, {
        where: {postId}
    });

    return updatePostData
  }

  deletePost = async (postId)=> {
    await Posts.destroy({
        where: {postId}
    })
    
  }
}

module.exports = PostRepository;