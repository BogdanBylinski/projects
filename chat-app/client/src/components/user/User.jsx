import "./User.scss";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import Avatar from "../avatar/Avatar";
function User({ user }) {
  const { photoURL, currentUser, setCurrentChat, currentChat } =
    useContext(UserContext);
  let { ...data } = user.users.filter((user) => user._id !== currentUser.uid);
  const chooseChat = (event) => {
    setCurrentChat(user);
  };
  return (
    <div className="userList_container-item" onClick={(e) => chooseChat(e)}>
      <Avatar url={data[0].photoURL}></Avatar>
      <p>{data[0].displayName}</p>
    </div>
  );
}

export default User;
