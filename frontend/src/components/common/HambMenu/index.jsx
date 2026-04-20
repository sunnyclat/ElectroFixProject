import React, { useState } from "react";
import "./styles.scss";

const HamburgerMenu = ({ children, className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`hamburger-menu ${menuOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>

      <div className={`menu-content ${menuOpen ? "open" : ""} ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default HamburgerMenu;