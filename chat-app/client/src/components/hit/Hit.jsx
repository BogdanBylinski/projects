import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import Avatar from "../avatar/Avatar";
// import io from "socket.io-client";

// let socket;
// const ENDPOINT = "http://localhost:3333";
function Hit({ hit, token }) {
  const { currentUser, setSearch } = useContext(UserContext);
  console.log(hit);
  const a = hit;
  console.log(currentUser);
  // if (hit.objectID === currentUser.uid) {
  //   return;
  // }

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", currentUser);

  //   // eslint-disable-next-line
  // }, []);
  const accessChat = async () => {
    console.log(a.objectID);
    let id = a.objectID;
    try {
      // setLoadingChat(true);
      const config = {
        params: {
          Authorization: "Bearer " + token,
        },
        id,
        user: currentUser.uid,
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:3333/api/chat`,

        config
      );
      setSearch(0);
      // socket.emit("newFriend", id);
      console.log(data);
      // if (!chats.find((c) => c.uid === data.uid)) setChats([data, ...chats]);
      // setSelectedChat(data);
      // setLoadingChat(false);
      // onClose();
    } catch (error) {
      console.log(error);
    }
  };
  if (hit.objectID === currentUser.uid) {
    return;
  }
  return (
    <div className="userList_container-item" onClick={() => accessChat()}>
      <Avatar url={hit.photoURL}></Avatar>
      <p>{hit.displayName}</p>
    </div>
  );
}

export default Hit;
