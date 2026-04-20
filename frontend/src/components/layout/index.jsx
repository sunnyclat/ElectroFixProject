import React from "react";
import "./styles.scss";
import Header from "../header";
import Footer from "../footer";
import Image from "../common/Image";
import FloatIcon from "../../assets/images/home/whatsapp.png";
const Layout = ({ children }) => {
  return (
    <div className="LayoutWrapper">
      <Header />
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
