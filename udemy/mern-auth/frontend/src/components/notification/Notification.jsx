import React from "react";
import "./Notification.scss";
import { useDispatch } from "react-redux";
import {
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
const Notification = () => {
  const dispatch = useDispatch();
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    dispatch(RESET());
  };
  return (
    <div className="container">
      <div className="alert">
        <p>
          <b>Message:</b> &nbsp;
        </p>
        <p>
          To verify your account, check your email for a verification link.
          &nbsp;
        </p>
        <p className="v-link" onClick={sendVerEmail}>
          <b>Resend Link</b>
        </p>
      </div>
    </div>
  );
};

export default Notification;
