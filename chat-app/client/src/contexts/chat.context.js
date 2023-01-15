import { createContext, useState } from "react";
export const ChatContext = createContext({
  search: null,
  setSearch: () => null,
  setNotification: () => null,
  notification: null,
});
export const ChatProvider = ({ children }) => {
  const [search, setSearch] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);

  const value = {
    search,
    setSearch,
    currentChat,
    setCurrentChat,
    setFetchAgain,
    fetchAgain,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
