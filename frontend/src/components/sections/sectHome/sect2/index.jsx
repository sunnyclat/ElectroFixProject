import "./styles.scss";
import Title from "../../../common/titleBar";

const Sect2 = () => {
  return (
    <section className="section2">
     <h2>Pasos a seguir para reparar tu electrodoméstico</h2>
      <div className="block">
        <div className="card">
          <div className="cardtit">
            <p>1</p>
          </div>
          <p>
            Contactános a través del formulario, deja tus datos y describí
            brevemente la situación. También podes contactarnos a través del
            whatsapp
          </p>
        </div>

        <div className="card">
          <div className="cardtit">
            <p>2</p>
          </div>
          <p>
            Quedáte atento al correo que de inmediato de responderemos con un
            numero de ticket y los días disponibles para una visita, si es
            necesaria. Te indicaremos las formas de pago para agendar la visita.
          </p>
        </div>

        <div className="card">
          <div className="cardtit">
            <p>3</p>
          </div>
          <p>
            Una vez recibida tu confirmación, recibirás un correo con los datos
            del técnico que te visitará. Si decidís traer el equipo, te
            aseguramos el diagnóstico el mismo día!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sect2;
