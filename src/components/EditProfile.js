import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const usernameInput = useSelector((state) => state.usernameInput);
  const emailInput = useSelector((state) => state.emailInput);
  const passwordInput = useSelector((state) => state.passwordInput);
  const nameInput = useSelector((state) => state.nameInput);
  const bioInput = useSelector((state) => state.bioInput);
  const locationInput = useSelector((state) => state.locationInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
      method: "PATCH",
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
        console.log(data);
        const token = data.token;
        localStorage.token = token;
        dispatch({
          type: "SET_USER",
          user: data,
        });
        props.history.push("/profile");
      });
  };

  return (
    <div>
      <Navbar />

      <div className="display">
        <div className="create-title">
          <h1>Edit Account Info</h1>
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
              placeholder={user?.name}
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
              placeholder={user?.username}
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
              placeholder={user?.email}
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
              placeholder={user?.bio}
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
              placeholder={user?.location}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
