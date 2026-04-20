import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Client = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleReg = (e) => {
    e.preventDefault();

    if (!name || !surname || !email) {
      setError("Por favor complete todos los campos");
      return;
    }
  };

  return (
    <div className="clientWrapper">
      <h1>REGISTRO DE CLIENTES</h1>

      <form onSubmit={handleReg}>
        <div className="form-group">
          <label htmlFor="nombre"></label>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido"></label>
          <input
            type="text"
            placeholder="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="error"> {error} </p>}
        <button type="submit" className="submitBtn">
          Confirmar
        </button>
      </form>

      <Link to="/" className="homeBtn">
        {" "}
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default Client;
