import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Logo from "../../assets/images/home/Logo.png";
//import UserIcon from "../../assets/images/home/UserIcon.png";
import UserIcon from "../../assets/images/home/lcono.svg";
import Image from "../common/Image";
import HamburgerMenu from "../common/HambMenu";
import HomeImg from "../../assets/images/home/hamb-menu/Home.png";
import ServicesImg from "../../assets/images/home/hamb-menu/Services.png";
import ProcessImg from "../../assets/images/home/hamb-menu/Process.png";
import BlogImg from "../../assets/images/home/hamb-menu/Blog.png";
import LoginImg from "../../assets/images/home/hamb-menu/Login.png";
import ThemeImg from "../../assets/images/home/hamb-menu/theme.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState("");
  const [showMobile, setShowMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMobile(window.innerWidth < 768);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className={`header ${isScrolled ? "shrink" : ""}`}>
      <Image className={`logo`} src={Logo} alt="logo" />

      <div
        className="MenuDesktop"
        style={{ display: showMobile ? "none" : "flex" }}
      >
        <div className="loginContainer">
          <a>{user}</a>
          <Image className={"UserIcon"} src={UserIcon} alt="userIcon" />
        </div>
        <ul className="navigationContainer">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Servicios</a>
          </li>
          <li>
            <a href="">Proceso</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
        </ul>
      </div>
      <div
        className="MenuMobile"
        style={{ display: showMobile ? "flex" : "none" }}
      >
        <HamburgerMenu className={"Mobile-Menu"}>
          <div className="topBarColor"></div>
          <div className="titleHM">
            <h2>electroFix</h2>
            <p>El spa de tus electrodomésticos</p>
          </div>
          <div className="menuHM">
            <ul>
              <li>
                <Image className={"imgHM"} src={HomeImg} alt="home" />
                <p>
                  <a href="">Home</a>
                </p>
              </li>
              <li>
                <Image className={"imgHM"} src={ServicesImg} alt="services" />
                <p>
                  <a href="">Servicios</a>
                </p>
              </li>
              <li>
                <Image className={"imgHM"} src={ProcessImg} alt="process" />
                <p>
                  <a href="">Proceso</a>
                </p>
              </li>
              <li>
                <Image className={"imgHM"} src={BlogImg} alt="blog" />
                <p>
                  <a href="">Blog</a>
                </p>
              </li>
              <li>
                <Image className={"imgHM"} src={LoginImg} alt="login" />
                <p>
                  <a href="">Login</a>
                </p>
              </li>
              <li>
                <Image className={"imgHM"} src={ThemeImg} alt="login" />
                <p>
                  <a href="">Modo Oscuro</a>
                </p>
              </li>
            </ul>
          </div>
        </HamburgerMenu>
      </div>
    </header>
  );
};

export default Header;
