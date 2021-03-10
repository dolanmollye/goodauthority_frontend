import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
// import {Avatar} from '@material-ui/core'
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ModeCommentIcon from '@material-ui/icons/ModeComment';

const PostList = () => {
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const token = localStorage.token;
    fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: { Authorization: `BEARER ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "ALL_POSTS",
          value: data,
        });
      });
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  return (
    <ul>
      {posts?.map((post) => (
        <Post post={post} />
      ))}
    </ul>
  );
};

export default PostList;
