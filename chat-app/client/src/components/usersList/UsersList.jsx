import "./UsersList.scss";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import User from "../user/User";
import Spinner from "../spinner/Spinner";
import { ChatContext } from "../../contexts/chat.context";
function UsersList() {
  // const [token, setToken]  = useState(null);
  const [arr, setArr] = useState([]);

  const { currentUser, token, setToken } = useContext(UserContext);
  const { fetchAgain } = useContext(ChatContext);
  console.log(fetchAgain);
  useEffect(() => {
    if (currentUser) {
      // currentUser.getIdToken().then((token) => {
      //   setToken(token);
      //   getUser();
      // });
      // getToken();
      getToken();
      console.log(token);
    }
  }, [currentUser]);
  const getToken = async () => {
    await currentUser
      .getIdToken()
      .then((token) => {
        return setToken(token);
      })
      .then(() => {
        return getUser();
      });
  };

  const getUser = async () => {
    if (token) {
      const config = {
        params: {
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get("http://localhost:3333/api/chat/", config);
      console.log(res.data, "aslkdnalskdkansnl");
      setArr(res.data);
    }
    return;
  };
  useEffect(() => {
    getUser();
  }, [token, fetchAgain]);
  console.log(arr);
  return (
    <div className="userList_container">
      {arr.length !== 0 ? (
        arr.map((user) => <User key={user._id} user={user}></User>)
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}

export default UsersList;
