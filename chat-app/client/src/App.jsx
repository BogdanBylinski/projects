import React from "react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatApp from "./routes/chatApp/ChatApp";
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoMatch from "./routes/noMatch/NoMatch";
import "./App.scss";
function App() {
  const auth = getAuth();
  const [spinner, setSpinner] = useState(true);
  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        setSpinner(true);
      } else {
        setSpinner(false);
      }
    },
    []
  );

  return (
    <div className="mainBody">
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route
            path="auth"
            element={
              !spinner ? <Login /> : <Navigate to={"/chat"} replace={true} />
            }
          ></Route>

          <Route
            path="chat"
            element={
              spinner ? (
                <ChatApp></ChatApp>
              ) : (
                <Navigate to={"/auth"} replace={true} />
              )
            }
          ></Route>
          <Route path="*" element={<NoMatch></NoMatch>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
