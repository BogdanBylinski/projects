import React from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const initialState = {
  password: "",
  password2: "",
};
const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const handleInputChange = (e) => {};
  const loginUser = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#9999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={loginUser}>
            <PasswordInput
              placeholder={"New Password"}
              name={"password"}
              onChange={handleInputChange}
              value={password}
            />
            <PasswordInput
              placeholder={"Confim New Password"}
              name={"password2"}
              onChange={handleInputChange}
              value={password2}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
