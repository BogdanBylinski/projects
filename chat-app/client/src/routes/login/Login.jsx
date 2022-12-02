import React, { useState } from "react";
import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import "./login.scss";

function Login() {
  const [tab1, setTab1] = useState(1);
  const [tab2, setTab2] = useState(0);

  const switchTab1 = () => {
    setTab1(1);
    setTab2(0);
  };
  const switchTab2 = () => {
    setTab2(1);
    setTab1(0);
  };
  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authContainer_tabs">
          <div
            className={`authContainer_tabs-tab ${tab1 === 1 ? "active" : ""}`}
            onClick={switchTab1}
          >
            SIGN IN
          </div>
          <div
            className={`authContainer_tabs-tab ${tab2 === 1 ? "active" : ""}`}
            onClick={switchTab2}
          >
            SIGN UP
          </div>
        </div>
        <div className="authContainer_content">
          {tab1 === 1 ? (
            <SignIn switchTab2={switchTab2}></SignIn>
          ) : (
            <SignUp></SignUp>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
