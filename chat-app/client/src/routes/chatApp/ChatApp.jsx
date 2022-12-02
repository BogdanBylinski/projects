import { React, useEffect } from "react";
import { useContext } from "react";
import Spinner from "../../components/spinner/Spinner";
import { UserContext } from "../../contexts/user.context";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "./ChatApp.scss";

import {
  auth,
  db,
  f,
  getCategoriesAndDocuments,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import axios from "axios";
import { useState } from "react";
import Hit from "../../components/hit/Hit";
import UsersList from "../../components/usersList/UsersList";
import Search from "../../components/search/Search";
import CurrentChat from "../../components/currentChat/CurrentChat";

function ChatApp() {
  const searchClient = algoliasearch(
    "AA38X7CP42",
    "29e68feeb7edb28e1b3c1e22a9b020b5"
  );

  const { currentUser, search } = useContext(UserContext);
  const [token, setToken] = useState("");
  const [idToFollow, setIdToFollow] = useState("VueQYdYXdAfEfh8m3GVRXDZbt9z2");
  const [input, setInput] = useState("");

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        setToken(token);
      });
    }
  }, [currentUser]);

  const send = async () => {
    const res = await axios.get("http://localhost:3333/", {
      headers: {
        Authorization: "vvvv " + token,
      },
    });
  };
  // const search = async (e) => {
  //   setInput(e.target.value);
  //   const res = await axios.get("http://localhost:3333/search", {
  //     headers: {
  //       Authorization: "vvvv " + token,
  //       Input: input,
  //     },
  //   });
  //   console.log(res.data);
  // };

  if (!currentUser) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="chatBody_container">
      <div className="chatBody_container-left">
        {search == 1 ? <Search></Search> : <UsersList></UsersList>}
      </div>
      <div className="chatBody_container-right">
        <CurrentChat></CurrentChat>
      </div>

      {/* <button onClick={signOutUser}>logout</button>
      <button onClick={() => f(idToFollow)}>send</button>
      <button onClick={send}>sendtoken</button>
      <input
        onChange={(e) => search(e)}
        value={input}
        type="text"
        name=""
        id=""
      />
      <InstantSearch searchClient={searchClient} indexName="displayName">
        <SearchBox />
        {/* <Hits hitComponent={(hit) => <Hit hit={hit}></Hit>} /> */}
      {/* </InstantSearch> */}
    </div>
  );
}

export default ChatApp;
