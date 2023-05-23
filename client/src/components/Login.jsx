import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import brainNoBg from "../assets/brainNoBg.png";
import nobgLogoTitle from "../assets/nobgLogoTitle.png";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div id="homepage">
    <div id="homepage-content">
    <img width="450" src={nobgLogoTitle}></img>
      <div className="homepagetitle">
        <img width="200" src={brainNoBg}></img>
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