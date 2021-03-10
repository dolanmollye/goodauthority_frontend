import React from "react";
import PostList from "../components/PostList";
import Navbar from "./Navbar";

const UserFeed = () => {
  return (
    <div>
      <Navbar />
      <PostList />
    </div>
  );
};

export default UserFeed;
