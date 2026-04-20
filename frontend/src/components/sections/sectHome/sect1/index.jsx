import Carousel from "../../../common/Carousel";
import Title from "../../../common/titleBar";
import "./styles.scss";

import img1 from "../../../../assets/images/home/imageCarousel1.png";
import img2 from "../../../../assets/images/home/imageCarousel2.png";
import img3 from "../../../../assets/images/home/imageCarousel3.png";
import img4 from "../../../../assets/images/home/imageCarousel4.png";
import FormHome from "./formHome";

const Sect1 = () => {
  const images = [img1, img2, img3, img4];
  return (
    <section className="section1">
      <div className="block">
        <Title
          className={"section1Txt"}
          text={"Nuestros servicios incluyen todas las marcas"}
        />
        <Carousel className="carouselImg" images={images} />
      </div>
      <div className="block">
        <Title
          className={"section1Txt"}
          text={"Solicitá AQUÍ Diagnóstico y/o visita"}
        />
        <FormHome />
      </div>
    </section>
  );
};

export default Sect1;
