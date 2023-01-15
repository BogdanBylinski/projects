import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserFollowingListLength,
  getUsersByIds,
  getUserImageURL,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  length: null,
  search: null,
  setSearch: () => null,
  photoURL: null,
  setToken: () => null,
  token: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
    length,
    search,
    setSearch,
    photoURL,
    currentChat,
    setCurrentChat,
    token,
    setToken,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        getPhotoURL();
      }

      setCurrentUser(user);
      // fetch();
      setSearch(false);
      // getPhotoURL();
    });

    return unsubscribe;
  }, []);
  const getPhotoURL = async () => {
    let link = await getUserImageURL();
    setPhotoURL(link);
  };

  const fetch = async () => {
    let arr = await getUsersByIds();
    setLength(arr);
    console.log(arr);
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
