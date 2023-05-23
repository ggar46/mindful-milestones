import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import brainWebLogo from "../assets/brainWebLogo.png";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div id="homepage">
    <div id="homepage-content">
      <div className="homepagetitle">
        <img width="400" src={brainWebLogo}></img>
      </div>
      <p className="description">
        {" "}
        Sign up or log in to begin!
      </p>
      <button
        textalign="center"
        className="login"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
      </div>
    </div>
  );
};

export default Login;