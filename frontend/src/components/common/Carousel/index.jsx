import React, { useState } from "react";
import "./styles.scss";
import Image from "../Image";
import arrowNext from "../../../assets/images/home/arrow-next.png";
import Button from "../Button";

const Carousel = ({ images, className }) => {
  const [courrentIndex, setCurrentIndex] = useState(0);
  const nextPage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  return (
    <div className={`carousel ${className}`}>
      <Image src={images[courrentIndex]} className="carousel-image" />

      <Button onClick={() => nextPage()} className="carousel-button">
        <Image src={arrowNext} alt="arrowNext" className="arrow" />
      </Button>
    </div>
  );
};

export default Carousel;
