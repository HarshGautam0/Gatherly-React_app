import { createContext, useReducer } from "react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import image9 from "../assets/image9.jpg";
import image10 from "../assets/image10.jpg";
import image11 from "../assets/image11.jpg";
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "Delete_Post") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "REACT_TO_POST") {
    newPostList = currPostList.map((post) => {
      if (post.id === action.payload.postId) {
        return {
          ...post,
          reactions: (post.reactions ? parseInt(post.reactions) : 0) + 1,
        };
      }

      return post;
    });
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const reactToPost = (postId) => {
    dispatchPostList({
      type: "REACT_TO_POST",
      payload: {
        postId,
      },
    });
  };

  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    let image;
    if (postTitle.includes("vacation")) {
      image = image1;
    } else if (postTitle.includes("tech")) {
      image = image2;
    } else if (postTitle.includes("Family")) {
      image = image3;
    } else if (postTitle.includes("Friends")) {
      image = image4;
    } else if (postTitle.includes("Pet")) {
      image = image5;
    } else if (postTitle.includes("Love")) {
      image = image7;
    } else if (postTitle.includes("Heart")) {
      image = image8;
    } else if (postTitle.includes("Single")) {
      image = image9;
    } else if (postTitle.includes("Phone")) {
      image = image10;
    } else {
      image = image11;
    }

    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        src: [image],
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userID: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "Delete_Post",
      payload: {
        postId,
      },
    });
  };
  const handleReactToPost = (postId) => {
    dispatchPostList({
      type: "REACT_TO_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, handleReactToPost }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    src: [image1],
    title: "Going to Mumbai",
    body: "Hey Guys! Mumbai jaa rha hu Chiillll karne.",
    reactions: "",
    userID: "user-9",
    tags: ["vacations", "Mumbai", "Chill out"],
  },
  {
    id: "2",
    src: [image2],
    title: "O Paas ho ge oye",
    body: "chaar saal mja karke paas ho gye. ab dekho aage kya hoga",
    reactions: "",
    userID: "user-10",
    tags: ["BTech", "Paas out", "mahnat safal"],
  },
];

export default PostListProvider;
