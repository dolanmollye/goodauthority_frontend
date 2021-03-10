import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: "SET_USER",
      user: {},
    });
    // props.history.push("/login");
  };

  return (
    <div className="nav-bar">
      <Link to="/home"> Good Authority Logo </Link>
      <Link to="/edit-profile"> Account </Link>
      <Link to="/profile"> Profile </Link>
      {!localStorage.token && <Redirect to="/login" />}
      <div onClick={handleLogout}>
        <button>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
