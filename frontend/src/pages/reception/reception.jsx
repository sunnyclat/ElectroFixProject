import React, { useState } from "react";
import "./style.scss";

const BASE_URL = "/api";

const Reception = () => {
  const [recepcion, setRecepcion] = useState({
    first_name: "",
    last_name: "",
    email: "",
    telefono: "",
    equipo: "",
    tipo: "",
    descripcion: "",
  });

  const formRef = React.createRef();

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setRecepcion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(BASE_URL + "/recepcion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recepcion),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert("Recepción registrada exitosamente");
          formRef.current.reset();
          setRecepcion({
            first_name: "",
            last_name: "",
            email: "",
            telefono: "",
            equipo: "",
            tipo: "",
            descripcion: "",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error de conexión");
      });
  };

  return (
    <div className="receptionWrapper">
      <h1>Recepción de Equipos</h1>
      
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            name="first_name"
            value={recepcion.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Apellido"
            name="last_name"
            value={recepcion.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={recepcion.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Teléfono"
            name="telefono"
            value={recepcion.telefono}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Equipo (ej: Heladera)"
            name="equipo"
            value={recepcion.equipo}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Tipo"
            name="tipo"
            value={recepcion.tipo}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <textarea
            placeholder="Descripción del problema"
            name="descripcion"
            value={recepcion.descripcion}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        
        <div className="confirm">
          <button type="submit">Confirmar Recepción</button>
        </div>
      </form>
      
      <a href="/admin" className="backBtn">← Volver al Admin</a>
    </div>
  );
};

export default Reception;