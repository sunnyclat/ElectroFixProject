import React from "react";
import Image from "../../../../common/Image";
import "./styles.scss";

function Card({ imge, title, txt, className }) {
  return (
    <div className={`cardWrapper ${className}`}>
      <div className="ImageCardContainer">
        <Image src={imge} alt={imge} />
      </div>
      <div className="cardTxt">
        <h2>{title}</h2>
      </div>
      <div className="cardTxt">
        <p>{txt}</p>
      </div>
    </div>
  );
}

export default Card;
