import "./styles.scss";
import img1 from "../../../../assets/images/home/Vector-1.png";
import img2 from "../../../../assets/images/home/Vector-2.png";
import img3 from "../../../../assets/images/home/Vector-3.png";
import img4 from "../../../../assets/images/home/Vector-4.png";
import Card from "./card/card";

const Sect3 = () => {

  return (
    <section className="section3">
      <h2 id="title">Por qué <a>electroFix</a>?</h2>

      <div className="cardSection">
        <Card
          className="cardSect3"
          imge={img1}
          title="Garantía"
          txt="Garantizamos nuestros trabajos 100%"
        />
        <Card
          className="cardSect3"
          imge={img2}
          title="Confiabilidad"
          txt="Nos caracteriza la seriedad y la puntualidad"
        />
        <Card
          className="cardSect3"
          imge={img3}
          title="Eficiencia"
          txt="Agilizamos tu trabajo y anticipamos las entregas"
        />
        <Card
          className="cardSect3"
          imge={img4}
          title="Calidad"
          txt="Comprometidos con la calidad desde el primer contacto"
        />
      </div>
    </section>
  );
};

export default Sect3;
