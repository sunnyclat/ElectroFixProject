import React, { useState } from "react";
import "./style.scss";

const BASE_URL = "/api";

const RegistroCliente = () => {
  const [usuario, setUsuario] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    cuit: "",
    telefono: "",
    condicion_iva: "",
  });

  const formRef = React.createRef();

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    if (name === "id" || name === "telefono") {
      value = Number(value);
    }

    if (name === "cuit") {
      value = String(value);
    }

    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleConfirmar = (e) => {
    e.preventDefault();

    fetch(BASE_URL + "/usuario/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        return response.json().then(data => ({ status: response.status, data }));
      })
      .then(({ status, data }) => {
        if (status >= 400) {
          alert("Error: " + (data.error || "Error desconocido"));
          return;
        }

        formRef.current.reset();
        setUsuario({
          id: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          cuit: "",
          telefono: "",
          condicion_iva: "",
        });

        alert("¡Registro exitoso! Ya podés iniciar sesión.");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error de petición al servidor:", error);
        alert("Error de conexión");
      });
  };

  const handleCancelar = () => {
    formRef.current.reset();
    setUsuario({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      cuit: "",
      telefono: "",
      condicion_iva: "",
    });
  };

  return (
    <div className="userWraper">
      <h1>Registro de Cliente</h1>

      <form ref={formRef} onSubmit={handleConfirmar}>
        <div className="form-group">
          <label htmlFor="id"></label>
          <input
            type="text"
            placeholder="DNI"
            value={usuario.id}
            name="id"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre"></label>
          <input
            type="text"
            placeholder="Nombre"
            value={usuario.first_name}
            name="first_name"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido"></label>
          <input
            type="text"
            placeholder="Apellido"
            value={usuario.last_name}
            name="last_name"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="Email"
            value={usuario.email}
            name="email"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña"></label>
          <input
            type="password"
            placeholder="Contraseña"
            value={usuario.password}
            name="password"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cuit"></label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="CUIT"
            value={usuario.cuit}
            name="cuit"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono"></label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Teléfono"
            value={usuario.telefono}
            name="telefono"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="condicion_iva"></label>
          <input
            type="text"
            placeholder="Condición IVA"
            value={usuario.condicion_iva}
            name="condicion_iva"
            onChange={handleInputChange}
          />
        </div>

        <div className="confirm">
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroCliente;