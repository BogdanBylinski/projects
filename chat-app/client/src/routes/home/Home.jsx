import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../../components/avatar/Avatar";
import SideBar from "../../components/sideBar/SideBar.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import ChatApp from "../chatApp/ChatApp";
import searchIcon from "../../assets/images/search.png";
import { ReactComponent as Logo } from "../../assets/images/result.svg";
import "./Home.styles.scss";
function Home() {
  const { currentUser, setSearch, search, photoURL } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const goToAuth = () => navigate("/auth");
    const goToChat = () => navigate("/chat");
    if (currentUser) {
      goToChat();
    }
    goToAuth();
  }, []);

  const setSearchOff = () => {
    setSearch(!search);
  };
  if (!currentUser) {
    return (
      <>
        <Outlet></Outlet>
      </>
    );
  }
  return (
    <>
      <div className="navLine">
        <div className="NavBar">
          <div className="NavBar_left">
            <div className="NavBar_left_item">
              <Logo></Logo>
            </div>
            <div className="NavBar_left_item">
              {!currentUser ? (
                ""
              ) : (
                <img onClick={setSearchOff} src={searchIcon} alt="search" />
              )}
            </div>
          </div>
          <div className="NavBar_center">
            <div className="NavBar_center_item">
              {!currentUser ? "" : <p>Messages</p>}
            </div>
          </div>
          <div className="NavBar_right">
            <div className="NavBar_right_item">
              {!currentUser ? <p>user</p> : <Avatar url={photoURL}></Avatar>}
            </div>
            <div className="NavBar_right_item">
              {!currentUser ? "" : <p onClick={signOutUser}>Logout</p>}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Home;
