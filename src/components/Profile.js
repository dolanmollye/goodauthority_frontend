import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Post from "./Post";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div class="w3-container">
        <div className="user-info">
          <div className="img-div">Picture</div>
          <div className="bio-buttons">
            <h3>{user?.username}</h3>
            <h3> {user?.location} </h3>
            <h3> {user?.bio} </h3>
            <button>Saved for later</button>
            <Link to="/edit-profile">
              <button>Edit Profile</button>
            </Link>
          </div>
        </div>

        <div>
          <Link to="/new-post">
            <button className="button-row"> Create New Post </button>
          </Link>
          <select className="drop-down">
            <option value="default">Sort By</option>
            <option value="Home-Cooked">Home-Cooked</option>
            <option value="Out to Eat">Out to Eat</option>
          </select>
        </div>
        <div className="photo-grid">
          {user.posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
