import React from "react";
import { Avatar } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";

const Post = (props) => {
  const dispatch = useDispatch();
  function handleLikes() {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${token}`,
      },
      body: JSON.stringify({
        like: {
          post_id: props.post.id,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.token = token;
        dispatch({
          type: "SET_LIKES",
          likes: data.likes,
        });
        // props.history.push("/home");
      });
  }

  return (
    <div>
      <div className="post-container">
        <h3>{props.post.user?.username}</h3>
        <div className="pic-div">
          <img src={props.post.image} style={{ width: "100px" }} />
        </div>
        <br></br>
        <div className="image-row">
          <div className="icon-div">
            <Avatar>
              <FavoriteBorderIcon onClick={handleLikes} />
            </Avatar>
            <Avatar>
              <ModeCommentIcon />
            </Avatar>
          </div>
          <div className="caption">{props.post.caption}</div>
          <div className="caption">{props.post.description}</div>
        </div>
        <br></br>
        <div>comments</div>
        <div className="comment-form">
          <form>
            <input
              className="comment"
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment..."
            />
            <button className="post-comment"> Post </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Post;
