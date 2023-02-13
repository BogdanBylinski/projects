import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className="--pad" style={{ minHeight: "80vh" }}>
        {children}{" "}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Layout;
