import "./CurrentChat.scss";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import io from "socket.io-client";
import Message from "../message/Message";
const ENDPOINT = "http://localhost:3333"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket, selectedChatCompare;

function CurrentChat() {
  const [inputValue, setInputValue] = useState("");
  const { currentChat, currentUser, notification, setNotification } =
    useContext(UserContext);
  const [token, setToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        setToken(token);
      });
    }
  }, [currentUser]);

  const sendMessage = async (event) => {
    if (inputValue) {
      console.log(currentChat);
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
    if (currentUser) {
      fetchMessages();
    }

    selectedChatCompare = currentChat;
    // eslint-disable-next-line
  }, [currentChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          console.log("not");
          setNotification([newMessageRecieved, ...notification]);
          //   setFetchAgain(!fetchAgain);
        }
      } else {
        console.log("newmessage received");
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const submitForm = async (e) => {
    e.preventDefault();

    setInputValue("");
    await sendMessage();
  };
  const submitFormWithEnter = (e) => {
    console.log(e.key);
  };
  const input = (e) => {
    setInputValue(e);
  };
  return (
    <div className="chat_container">
      {currentChat ? (
        <div className="chat_container-messages">
          <div className="messages">
            {messages.length > 0 && currentChat
              ? messages.map((m, i) => (
                  <Message key={i} messages={messages} m={m} i={i}></Message>
                ))
              : ""}
          </div>
          <div className="input_row">
            <form
              action="submit"
              onSubmit={submitForm}
              className="message_form"
            >
              <label htmlFor="form-input"></label>
              <input
                value={inputValue}
                onChange={(e) => input(e.target.value)}
                name="form-input"
                type="textarea"
                className="message_form-input"
              />
              <div className="message_form-button">
                <button>SEND</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div className="chat_container_users"></div> */}
    </div>
  );
}

export default CurrentChat;
