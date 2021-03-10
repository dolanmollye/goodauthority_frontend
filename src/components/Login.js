import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();
  const usernameInput = useSelector((state) => state.usernameInput);
  const passwordInput = useSelector((state) => state.passwordInput);
  const emailInput = useSelector((state) => state.emailInput);
  const nameInput = useSelector((state) => state.nameInput);
  const bioInput = useSelector((state) => state.bioInput);
  const locationInput = useSelector((state) => state.bioInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username: usernameInput,
          password: passwordInput,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => authResponse(data));
  };

  const authResponse = (data) => {
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      const token = data.jwt;
      localStorage.setItem("token", token);
      dispatch({
        type: "SET_USER",
        user: data.user,
      });
      props.history.push("/home");
    }
  };

  let paperStyle = {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "200px auto",
    border: "2px solid black",
    borderRadius: "10px",
  };
  let avatarStyle = { backgroundColor: "rgb(17, 105, 79)" };
  let btnstyle = {
    margin: "8px 0",
    backgroundColor: "rgb(17, 105, 79)",
    color: "white",
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Good Authority</h2>
            <h3>Login below</h3>
          </Grid>
          <TextField
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_NAME",
                value: e.target.value,
              })
            }
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
          />
          <TextField
            onChange={(e) =>
              dispatch({
                type: "CHANGE_USER_PASSWORD",
                value: e.target.value,
              })
            }
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          />
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
          </Link>
          <Typography>
            Forgot password?
            {/* <Link to='/create-account' href="#" style={{marginLeft: '8px'}} >
                        Sign Up 
                     </Link> */}
          </Typography>
          <Typography>
            {" "}
            Don't have an account?
            <Link to="/create-account" href="#" style={{ marginLeft: "8px" }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
};

export default Login;
