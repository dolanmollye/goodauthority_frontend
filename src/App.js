import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import UserFeed from "./components/UserFeed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      fetch("http://localhost:3000/api/v1/profile", {
        // method: "GET",
        headers: { "Authorization": `BEARER ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch({
            type: "SET_USER",
            user: data.user,
          });
        });
    }
  }, []);

  return (
    <div className="app">
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={UserFeed} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/edit-profile" component={EditProfile} />
      <Route exact path="/new-post" component={NewPost} />
      <Route
        exact
        path="/post"
        render={(props) => <Post post={post} {...props} />}
      />
    </div>
  );
};

export default App;
