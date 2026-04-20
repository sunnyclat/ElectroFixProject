import "./styles.scss";
import Title from "../../../common/titleBar";
import img from "../../../../assets/images/home/map-icon.png";
import Image from "../../../common/Image";
const Sec4 = () => {
  return (
    <section className="section4">
      <h2>Cobertura de nuestros servicios</h2>
      <div className="imageSect4Container">
        <Image src={img} alt="" />
      </div>
    </section>
  );
};

export default Sec4;
