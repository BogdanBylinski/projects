import "./CurrentChat.scss";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import io from "socket.io-client";
import Message from "../message/Message";
import Typing from "../typing/Typing";
import { ChatContext } from "../../contexts/chat.context";
const ENDPOINT = "http://localhost:3333"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket, selectedChatCompare;
function CurrentChat() {
  const [inputValue, setInputValue] = useState("");
  const { currentUser, currentChat, setCurrentChat, token, setToken } =
    useContext(UserContext);
  const {
    setFetchAgain,

    fetchAgain,
  } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  // const [token, setToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("disconnect", () => {
      setCurrentChat(null);
      console.log("disconnected");
    });

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     currentUser.getIdToken().then((token) => {
  //       setToken(token);
  //     });
  //   }
  // }, [currentUser]);
  useEffect(() => {
    localStorage.setItem("time", Date.now());
    console.log("new token");
  }, [token]);
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const checkTokenExpiration = () => {
    let expirationTime = localStorage.getItem("time");
    if (Date.now() - expirationTime > 1800000) {
      currentUser.getIdToken().then((token) => {
        setToken(token);
      });
    }
  };

  const sendMessage = async (event) => {
    checkTokenExpiration();
    if (inputValue && event === "Enter") {
      socket.emit("stop typing", currentChat.uid);
      try {
        const config = {
          params: {
            Authorization: "Bearer " + token,

            content: inputValue,
            chatId: currentChat._id,
          },
          headers: {
            "Content-type": "application/json",
          },
        };
        setInputValue("");
        const { data } = await axios.post(
          "http://localhost:3333/api/message",
          {},
          config
        );
        if (data["message"] === "Bad token") {
          return;
        }
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchMessages = async () => {
    if (!currentChat) return;

    try {
      const config = {
        params: {
          Authorization: "Bearer " + token,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:3333/api/message/${currentChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", currentChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentChat) {
      currentUser.getIdToken().then((token) => {
        setToken(token);
      });
      socket.emit("join chat", currentChat._id);
      fetchMessages();
    }
  }, [currentChat]);
  // eslint-disable-next-line
  useEffect(() => {
    if (currentChat) {
      console.log(currentChat._id, "-asodkapsokdaposkdaposdaskpkd-");
    }
  }, [currentChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !currentChat ||
        currentChat._id !== newMessageRecieved.chat._id // if chat is not selected or doesn't match current chat
      ) {
        console.log(123123123123);
        return;
      }
      if (currentChat && currentChat._id === newMessageRecieved.chat._id) {
        console.log("newmessage received");
        console.log(newMessageRecieved.chat._id === currentChat._id);
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const submitForm = async (e) => {
    e.preventDefault();

    setInputValue("");
    await sendMessage("Enter");
  };
  const submitFormWithEnter = (e) => {
    console.log(e.key);
  };
  const input = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      return;
    }
    setInputValue(e.target.value);
  };
  const checkEnter = async (e) => {
    if (e.key === "Enter" && !inputValue) {
      e.preventDefault();
    }
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      await sendMessage("Enter");
    }
  };
  return (
    <div className="chat_container">
      {currentChat ? (
        <div className="chat_container-messages">
          <div className="messages">
            {messages.length > 0
              ? messages.map((m, i) => (
                  <Message
                    key={i}
                    messages={messages}
                    // newMessage={newMessage}
                    m={m}
                    i={i}
                  ></Message>
                ))
              : ""}
          </div>
          {/* {typing ? <Typing></Typing> : null} */}
          <div className="input_row">
            <form
              action="submit"
              onSubmit={submitForm}
              onKeyPress={(e) => {
                checkEnter(e);
              }}
              className="message_form"
            >
              <label htmlFor="form-input"></label>
              <textarea
                value={inputValue}
                onChange={(e) => input(e)}
                name="form-input"
                type="textarea"
                className="message_form-input"
              ></textarea>

              <div className="message_form-button">
                <button>SEND</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="chat_container-noChat">
          <p>Select a chat to start messaging</p>
        </div>
      )}
      {/* <div className="chat_container_users"></div> */}
    </div>
  );
}

export default CurrentChat;
