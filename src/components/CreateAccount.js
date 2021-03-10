import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const usernameInput = useSelector((state) => state.usernameInput);
  const emailInput = useSelector((state) => state.emailInput);
  const passwordInput = useSelector((state) => state.passwordInput);
  const nameInput = useSelector((state) => state.nameInput);
  const bioInput = useSelector((state) => state.bioInput);
  const locationInput = useSelector((state) => state.bioInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          name: nameInput,
          username: usernameInput,
          email: emailInput,
          bio: bioInput,
          location: locationInput,
          password: passwordInput,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.jwt;
        localStorage.token = token;
        dispatch({
          type: "SET_USER",
          user: data.user,
        });
        props.history.push("/home");
      });
  };

  return (
    <div className="display">
      <div className="create-title">
        <h1>Create Account</h1>
      </div>
      <div className="sign-up">
        <form className="account-editor" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_FULL_NAME",
                value: e.target.value,
              })
            }
            type="text"
            name="name"
            placeholder="First and Last Name"
          ></input>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_NAME",
                value: e.target.value,
              })
            }
            type="text"
            name="username"
            placeholder="Username"
          />

          <label htmlFor="email">Email Address</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_INPUT",
                value: e.target.value,
              })
            }
            type="text"
            name="email"
            placeholder="Email Address"
          />
          <label htmlFor="bio">Bio</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_BIO",
                value: e.target.value,
              })
            }
            type="text"
            name="bio"
            placeholder="A little about yourself..."
          />
          <label htmlFor="location">Location</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_LOCATION",
                value: e.target.value,
              })
            }
            type="text"
            name="location"
            placeholder="Your Location"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_PASSWORD",
                value: e.target.value,
              })
            }
            type="text"
            name="password"
            placeholder="Create Password"
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
