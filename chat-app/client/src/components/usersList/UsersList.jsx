import "./UsersList.scss";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import User from "../user/User";
import Spinner from "../spinner/Spinner";
function UsersList() {
  const [token, setToken] = useState(null);
  const [arr, setArr] = useState([]);

  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (currentUser) {
      // currentUser.getIdToken().then((token) => {
      //   setToken(token);
      //   getUser();
      // });
      // getToken();
      getToken();
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
  useEffect(() => {
    getUser();
  }, [token]);
  const getUser = async () => {
    if (token) {
      const config = {
        params: {
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get("http://localhost:3333/api/chat/", config);
      setArr(res.data);
    }
    return;
  };

  return (
    <div className="userList_container">
      <User></User>
      {arr.length > 0 ? (
        arr.map((user) => <User key={user._id} user={user}></User>)
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}

export default UsersList;
