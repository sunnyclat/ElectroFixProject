import React from "react";
import Image from "../common/Image";
//import FloatIcon from "../../assets/images/home/whatsapp.png";
import FloatIcon from "../../assets/images/home/wsp.svg";
import "./styles.scss";


const FloatImag = () => {
  return (
    <div className="floatImag">
      <Image className="FloatIconImg" src={FloatIcon} alt="FloatIconWsp" />
    </div>
  );
};

export default FloatImag;
