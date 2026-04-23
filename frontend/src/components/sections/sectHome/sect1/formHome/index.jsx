import React, { useState } from "react";
import Form from "../../../../common/form";
import "./styles.scss";
import Button from "../../../../common/Button";

const FormHome = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    telefono: "",
    equipo: "",
    tipo: "",
    descripcion: "",
    fecha: ""
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name || "",
      email: formData.email,
      telefono: formData.telefono,
      equipo: formData.equipo,
      tipo: formData.tipo,
      descripcion: formData.descripcion,
      fecha_visita: formData.fecha ? new Date(formData.fecha).toISOString() : null
    };

    fetch("/api/recepcion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setEnviado(true);
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            telefono: "",
            equipo: "",
            tipo: "",
            descripcion: "",
            fecha: ""
          });
          setTimeout(() => setEnviado(false), 3000);
        }
      })
      .catch((err) => {
        setError("Error de conexión");
      });
  };

  if (enviado) {
    return (
      <div className="formHome" style={{ textAlign: "center", padding: "2rem" }}>
        <h3 style={{ color: "#4CAF50", fontSize: "1.5rem" }}>
          ¡Solicitud enviada exitosamente!
        </h3>
        <p>Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <form className="formHome" onSubmit={handleSubmit}>
      <Form
        name={"first_name"}
        text={"Nombre"}
        type={"text"}
        placeholder={"Introduce tu nombre"}
        value={formData.first_name}
        onChange={handleInputChange}
      />
      <Form
        name={"email"}
        text={"Correo electronico"}
        type={"email"}
        placeholder={"Introduce tu correo"}
        value={formData.email}
        onChange={handleInputChange}
      />
      <Form
        name={"telefono"}
        text={"Número de contacto"}
        type={"tel"}
        placeholder={"Introduce tu número de contacto"}
        value={formData.telefono}
        onChange={handleInputChange}
      />
      <Form
        name={"descripcion"}
        text={"Descripción de la falla"}
        type={"text"}
        placeholder={"Describe brevemente la falla de tu equipo"}
        value={formData.descripcion}
        onChange={handleInputChange}
      />
      <div className="secondForm">
        <div className="block1">
          <p>Selecciona equipo</p>
          <select 
            name="equipo" 
            id="products"
            value={formData.equipo}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Equipo
            </option>
            <option value="heladera">Heladera</option>
            <option value="aire">Aire acondicionado</option>
            <option value="tv">Televisor</option>
            <option value="lavarropas">Lavarropas</option>
            <option value="microondas">Microondas</option>
            <option value="otro">Otro</option>
          </select>
          <div className="form">
            <p>Programa una visita</p>
            <input 
              type="date" 
              name="fecha" 
              value={formData.fecha} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="block2">
          <Button type={"submit"} className={"sendForm"}>Enviar</Button>
        </div>
      </div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </form>
  );
};

export default FormHome;