import "./User.scss";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import Avatar from "../avatar/Avatar";
import { ChatContext } from "../../contexts/chat.context";
function User({ user }) {
  const { photoURL, currentUser, setCurrentChat, currentChat } =
    useContext(UserContext);
  const {} = useContext(ChatContext);
  console.log(currentChat, "current Chat");
  let { ...data } = user.users.filter((user) => user._id !== currentUser.uid);
  const chooseChat = (event) => {
    setCurrentChat(user);
    console.log(user);
    localStorage.setItem("latestChat", JSON.stringify(user));
  };
  // console.log(currentChat);
  // useEffect(() => {
  //   let latestChat = localStorage.getItem("latestChat");
  //   setCurrentChat(JSON.parse(latestChat));
  // }, []);
  return (
    <div
      className={`userList_container-item ${
        currentChat && currentChat._id === user._id ? "currentChat" : ""
      }`}
      onClick={(e) => chooseChat(e)}
    >
      <Avatar url={data[0].photoURL}></Avatar>
      <div className="chats">
        <p>{data[0].displayName}</p>
        {user.latestMessage ? (
          <div className="bottom">
            {user.latestMessage.content.length > 15
              ? user.latestMessage.content.substring(0, 16) + "..."
              : user.latestMessage.content}
            <p className="time">
              {new Date(user.latestMessage.createdAt)
                .toTimeString()
                .split("GMT")[0]
                .slice(0, 5)}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default User;
