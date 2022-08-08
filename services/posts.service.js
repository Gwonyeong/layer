// services/posts.service.js

const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();
    
    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map(post => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }
    });
  }
  getPost = async (postId) => {
    const getPostData = await this.postRepository.findOnePost(postId)

    return {
        postId: getPostData.null,
        nickname: getPostData.nickname,
        title: getPostData.title,
        content: getPostData.content,
        createdAt: getPostData.createdAt,
        updatedAt: getPostData.updatedAt,
        
      };
  }
  createPost = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(nickname, password, title, content);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createPostData.null,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
      msg : "게시물이 생성되었습니다!"
    };
  }

  updatePost = async (postId, title, content, password)=>{
    const updatePostData = await this.postRepository.findOnePost(postId)

    if(password !== updatePostData.password){
        //입력한 비밀번호가 다른 경우
        return {
        msg :"입력한 비밀번호가 다릅니다."}
    }
    const updatedPostData = await this.postRepository.updatePost(postId,title,content)
    
    return {
        postId: updatedPostData.null,
        nickname: updatedPostData.nickname,
        title: updatedPostData.title,
        content: updatedPostData.content,
        createdAt: updatedPostData.createdAt,
        updatedAt: updatedPostData.updatedAt,
        msg : "게시물이 수정되었습니다."
      };
  }

  deletePost = async (postId) =>{
    await this.postRepository.deletePost(postId)
    return {
        msg : "게시물이 삭제되었습니다."
    }
  }
}

module.exports = PostService;