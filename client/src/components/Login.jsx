import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import braingrey from "../assets/braingrey.png";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <div className="homepagetitle">
        <img width="400" src={braingrey}></img>
      </div>
      <p className="description">
        {" "}
        Description
      </p>
      <button
        textalign="center"
        className="login"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;