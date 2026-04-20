import React from "react";
import "./styles.scss";
import Image from "../common/Image";
import faceIcon from "../../assets/images/home/facebook.png";
import instaIcon from "../../assets/images/home/instagram.png";
import {
  Link,
  BrowserRouter,
  Route,
  Routes as ReactDOMRoutes,
} from "react-router-dom";
import User from "../../pages/user/user";

const Footer = () => {
  return (
    <footer>
      <div className="card-wrapper">
        <div className="card">
          <h2>Copyright © 2023 electroFix </h2>
          <p>
            {" "}
            Desarrollado por: <br />
            <a>www.electrogestion.com</a>{" "}
          </p>
        </div>

        <div className="card">
          <h2>Sobre nosotros </h2>
          <p>
            Somos electroFix una empresa de servicio técnico especializado,
            comprometida con la calidad y excelencia <br /> Nuestra vocación es
            servir al primer contacto
          </p>
        </div>

        <div className="card">
          <h2>Secciones </h2>
          <p>
            * Proceso <br />* Contacto <br />* Trabaja con nosotros
            <br /> * Preguntas frecuentes
          </p>
        </div>

        <div className="card">
          <h2>Contactános </h2>
          <p>
            electrofix@electrofix.com <br />
            +54 11 5555 5555 <br />
            Av Corrientes, 3535, CABA
          </p>
          <ul className="imagenes">
            <li>
              <img className="FooterIcon" src={faceIcon} alt="faceIcon" />{" "}
            </li>
            <li>
              {" "}
              <img
                className="FooterIcon"
                src={instaIcon}
                alt="instaIcon"
              />{" "}
            </li>
          </ul>
        </div>
      </div>

      {/*
        <ul>


          <li>
            <a href="">
              <Image className="FooterIcon" src={faceIcon} alt="faceIcon" />
            </a>
          </li>
          <li>
            <a href="">
              <Image className="FooterIcon" src={instaIcon} alt="instaIcon" />
            </a>
          </li>


        </ul>
  */}
    </footer>
  );
};

export default Footer;
