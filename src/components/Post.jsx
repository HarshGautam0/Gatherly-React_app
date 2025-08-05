import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { PostList } from "../store/post-list-store";
const Post = ({ post }) => {
  const { deletePost, handleReactToPost } = useContext(PostList);
  return (
    <div className="card post-card">
      <div className="card-body image">
        {post.src.map((source, index) => (
          <img key={index} src={source} alt="" />
        ))}
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className="badge text-bg-primary hashtag" key={tag}>
            #{tag}
          </span>
        ))}
        <div
          className="alert alert-success reaction"
          role="alert"
          onClick={() => handleReactToPost(post.id)}
        >
          <BiSolidLike /> {post.reactions}
        </div>
      </div>
    </div>
  );
};

export default Post;
