import React, { useState } from "react";
import "./SignIn.scss";
import "./Button.scss";
import axios from "axios";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

function SignIn({ switchTab2 }) {
  const [loading, setLoading] = useState(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const { user } = await signInWithGooglePopup();
    const { displayName, email, uid, photoURL } = user;
    let obj = {
      uid,
      displayName: displayName,
      email: email,
      // createdAt,
      following: [],
      followers: [],
      photoURL: photoURL
        ? photoURL
        : "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png",
    };
    const config = {
      ...obj,
      headers: {
        "Content-type": "application/JSON",
      },
    };
    console.log(user);
    console.log(user);
    console.log(user);
    console.log(user);
    console.log(user);
    try {
      if (user) {
        await axios.post("http://localhost:3333/api/user/", config);
      }
    } catch (e) {}
    // window.localStorage.setItem("auth", true);
    await createUserDocumentFromAuth(user);
  };
  const signIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(1);
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setLoading(0);
      console.log(response);
    } catch (error) {
      setLoading(0);
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <>
      <form action="submit" className="authContainer_form" onSubmit={signIn}>
        <div className="authContainer_form-item">
          <input
            type="email"
            name="login"
            value={email}
            id="login"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="login"></label>
        </div>
        <div className="authContainer_form-item">
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            // onChange={}
          />
          <label htmlFor="password"></label>
        </div>
        <div className="authContainer_buttons">
          <button className="button login" disabled={loading} onClick={signIn}>
            {loading ? "SIGNING UP..." : "LOGIN"}
          </button>
          <button
            className="button google"
            onClick={(e) => signInWithGoogle(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
          </button>
        </div>
      </form>
      <div className="authContainer_signUp">
        <div className="authContainer_signUp-text">Don`t have account yet?</div>
        <div className="authContainer_signUp-link">
          <p onClick={switchTab2}>SIGN UP</p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
