import { Radio } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import React from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";

const NewPost = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const imageURL = useSelector((state) => state.imageURL);
  const radioBtn = useSelector((state) => state.radioBtn);
  const captionInput = useSelector((state) => state.captionInput);
  const descriptionInput = useSelector((state) => state.descriptionInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/new-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${localStorage.token}`,
      },
      body: JSON.stringify({
        post: {
          user_id: user.id,
          image: imageURL,
          restaurant: radioBtn == "Out to Eat",
          caption: captionInput,
          description: descriptionInput,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_POST",
          value: data,
        });
        props.history.push("/profile");
      });
  };

  return (
    <div>
      <Navbar />
      <h2>Create a New Post</h2>
      <div className="new-post">
        <div className="column left">
          <div className="btn-div">
            <h3>Enter your image url below.</h3>
            <input
              onChange={(e) =>
                dispatch({
                  type: "POST_IMAGE",
                  value: e.target.value,
                })
              }
              placeholder="Image URL"
            ></input>
          </div>
          <br></br>
          <br></br>
        </div>
        <div className="columnright">
          <form onSubmit={handleSubmit}>
            <FormControlLabel
              value="end"
              control={
                <Radio
                  checked={radioBtn === "Out to Eat"}
                  label="Out To Eat"
                  color="primary"
                  onChange={() =>
                    dispatch({
                      type: "RESTAURANT_OR_RECIPE",
                      value: "Out to Eat",
                    })
                  }
                />
              }
              label="Out to Eat"
            />

            <br></br>
            <input
              onChange={(e) =>
                dispatch({
                  type: "SET_CAPTION",
                  value: e.target.value,
                })
              }
              className="ingred"
              type="text"
              name="name"
              placeholder="Caption..."
            ></input>
            <br></br>
            <input
              onChange={(e) =>
                dispatch({
                  type: "SET_DESCRIPTION",
                  value: e.target.value,
                })
              }
              className="ingred"
              type="text"
              name="name"
              placeholder="Restaurant Name and URL"
            ></input>
            <br></br>
            <FormControlLabel
              value="end"
              control={
                <Radio
                  checked={radioBtn === "Home Cooked"}
                  label="Home Cooked"
                  color="primary"
                  onChange={() =>
                    dispatch({
                      type: "RESTAURANT_OR_RECIPE",
                      value: "Home Cooked",
                    })
                  }
                />
              }
              label="Home Cooked"
            />
            <br></br>
            <input
              onChange={(e) =>
                dispatch({
                  type: "SET_CAPTION",
                  value: e.target.value,
                })
              }
              className="ingred"
              type="text"
              name="name"
              placeholder="Caption..."
            ></input>
            <br></br>
            <textarea
              onChange={(e) =>
                dispatch({
                  type: "SET_DESCRIPTION",
                  value: e.target.value,
                })
              }
              className="ingreds"
              type="text"
              name="name"
              placeholder="Ingredients and Instructions"
            ></textarea>
            <div className="save-btn">
              <button onClick={(e) => handleSubmit(e)}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
