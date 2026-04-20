import React from "react";
import Form from "../../../../common/form";
import "./styles.scss";
import Button from "../../../../common/Button";


const RegistroUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    rol: 'cliente'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleConfirmar = () => {
   
    console.log('Usuario registrado:', usuario);
    
    setUsuario({
      nombre: '',
      apellido: '',
      email: '',
      contraseña: '',
      rol: 'cliente'
    });
  };

  const handleCancelar = () => {
   
    setUsuario({
      nombre: '',
      apellido: '',
      email: '',
      contraseña: '',
      rol: 'cliente'
    });
  };


}






const FormHome = () => {
  return (
    
    <form className="formHome">
      <Form
        name={"fName"}
        text={"Nombre"}
        type={"text"}
        placeholder={"Introduce tu nombre"}
      />
      <Form
        name={"email"}
        text={"Correo electronico"}
        type={"email"}
        placeholder={"Introduce tu correo"}
      />
      <Form
        name={"celNumber"}
        text={"Número de contacto"}
        type={"tel"}
        placeholder={"Introduce tu número de contacto"}
      />
      <Form
        name={"description"}
        text={"Descripción de la falla"}
        type={"text"}
        placeholder={"Describe brevemente la falla de tu equipo"}
      />
      {/* <Form
        className={"Check"}
        name={"test"}
        text={"esto es un checkbox"}
        type={"checkbox"}
      /> */}
      <div className="secondForm">
        <div className="block1">
          <p>Selecciona equipo</p>
          <select name="products" id="products">
            <option value={"Equipo"} disabled>
              Equipo
            </option>
            <option value={"heladera"}>Heladera</option>
            <option value={"aire"}>Aire c.</option>
            <option value={"tv"}>Televisor</option>
          </select>
          <Form
            className={"calendar"}
            type={"date"}
            text={"Programa una visita"}
          />
        </div>
        <div className="block2">
          <Button className={"sendForm"} >Enviar</Button>
        </div>
      </div>
    </form>
  );
};

export default FormHome;
