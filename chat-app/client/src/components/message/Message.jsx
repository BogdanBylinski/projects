import "./Message.scss";
import React, { useContext, useRef } from "react";
import { UserContext } from "../../contexts/user.context";
import Avatar from "../avatar/Avatar";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { useEffect } from "react";
function Message({ m, i, messages, newMessage }) {
  const { currentUser } = useContext(UserContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const scrollToBottomSmooth = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // useEffect(() => {
  //   if (messages) {
  //     scrollToBottomSmooth();
  //   }
  // }, [messages]);
  const isImage = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };
  return (
    <div
      className={
        isSameSender(messages, m, i, currentUser.uid) ||
        isLastMessage(messages, i, currentUser.uid)
          ? "pseudo"
          : ""
      }
      style={{ display: "flex", gap: "10px" }}
      key={m._id}
    >
      {(isSameSender(messages, m, i, currentUser.uid) ||
        isLastMessage(messages, i, currentUser.uid)) && (
        <Avatar url={m.sender.photoURL} end={true} small={true} />
      )}
      <span
        className="bubble"
        style={{
          backgroundColor: `${
            m.sender._id === currentUser.uid ? "#d3e9fa" : "#e8e8e8"
          }`,
          color: `${m.sender._id === currentUser.uid ? "#547caa" : "black"}`,
          marginLeft: isSameSenderMargin(messages, m, i, currentUser.uid),
          // marginTop: isSameUser(messages, m, i, currentUser.uid) ? 10 : 10,
          marginTop: "10px",
          // borderRadius: "8px",
          padding: "5px 15px",
          maxWidth: "75%",
          minHeight: "20px",
          wordBreak: "break-all",
        }}
      >
        {m.content}
      </span>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Message;
