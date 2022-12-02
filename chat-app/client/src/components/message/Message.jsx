import "./Message.scss";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import Avatar from "../avatar/Avatar";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
function Message({ m, i, messages }) {
  const { currentUser } = useContext(UserContext);
  return (
    <div style={{ display: "flex" }} key={m._id}>
      {(isSameSender(messages, m, i, currentUser.uid) ||
        isLastMessage(messages, i, currentUser.uid)) && (
        <Avatar url={m.sender.photoURL} />
      )}
      <span
        style={{
          backgroundColor: `${
            m.sender._id === currentUser.uid ? "#BEE3F8" : "#B9F5D0"
          }`,
          marginLeft: isSameSenderMargin(messages, m, i, currentUser.uid),
          marginTop: isSameUser(messages, m, i, currentUser.uid) ? 3 : 10,
          borderRadius: "20px",
          padding: "5px 15px",
          maxWidth: "75%",
        }}
      >
        {m.content}
      </span>
    </div>
  );
}

export default Message;
