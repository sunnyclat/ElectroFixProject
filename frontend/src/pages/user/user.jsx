import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const BASE_URL = "/api";
const EMPLOYEE_ROLE_OPTIONS = ["tecnico", "administrativo", "atencion al cliente"];

const initialUsuario = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  telefono: "",
  rol: "",
};

const User = () => {
  const [usuario, setUsuario] = useState(initialUsuario);
  const [roles, setRoles] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await fetch(BASE_URL + "/rol");
        const data = await response.json();
        const currentRoles = Array.isArray(data) ? data : [];
        const existingDescriptions = currentRoles.map((rol) =>
          rol.descripcion?.toLowerCase()
        );
        const missingRoles = EMPLOYEE_ROLE_OPTIONS.filter(
          (descripcion) => !existingDescriptions.includes(descripcion)
        );

        if (missingRoles.length > 0) {
          await Promise.all(
            missingRoles.map((descripcion) =>
              fetch(BASE_URL + "/rol", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ descripcion }),
              })
            )
          );

          const updatedResponse = await fetch(BASE_URL + "/rol");
          const updatedData = await updatedResponse.json();
          const updatedRoles = Array.isArray(updatedData) ? updatedData : [];

          setRoles(
            updatedRoles.filter((rol) =>
              EMPLOYEE_ROLE_OPTIONS.includes(rol.descripcion?.toLowerCase())
            )
          );
          return;
        }

        setRoles(
          currentRoles.filter((rol) =>
            EMPLOYEE_ROLE_OPTIONS.includes(rol.descripcion?.toLowerCase())
          )
        );
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };

    loadRoles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "id") {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: value.replace(/\D/g, ""),
      }));
      return;
    }

    if (name === "telefono") {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: value.replace(/[^\d+]/g, "").slice(0, 15),
      }));
      return;
    }

    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleConfirmar = async (e) => {
    e.preventDefault();

    const payload = {
      ...usuario,
      id: Number(usuario.id),
      rol: Number(usuario.rol),
      telefono: Number(usuario.telefono.trim()),
    };

    if (
      !payload.id ||
      !payload.first_name.trim() ||
      !payload.last_name.trim() ||
      !payload.email.trim() ||
      !payload.password ||
      !payload.telefono ||
      !payload.rol
    ) {
      alert("Completa todos los campos requeridos.");
      return;
    }

    try {
      const response = await fetch(BASE_URL + "/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.error || "No se pudo registrar el empleado."));
        return;
      }

      formRef.current?.reset();
      setUsuario(initialUsuario);
      alert("Registro de usuario exitoso.");
    } catch (error) {
      console.error("Error de peticion al servidor:", error);
      alert("Error de conexion");
    }
  };

  const handleCancelar = () => {
    formRef.current?.reset();
    setUsuario(initialUsuario);
  };

  return (
    <div className="userWraper">
      <h1>Registro de Usuario</h1>

      <form ref={formRef} onSubmit={handleConfirmar}>
        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select name="rol" value={usuario.rol} onChange={handleInputChange}>
            <option value="">Seleccionar rol</option>
            {roles.map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id"></label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="DNI"
            value={usuario.id}
            name="id"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name"></label>
          <input
            type="text"
            placeholder="Nombre"
            value={usuario.first_name}
            name="first_name"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name"></label>
          <input
            type="text"
            placeholder="Apellido"
            value={usuario.last_name}
            name="last_name"
            onChange={handleInputChange}
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="Contrasena"
            value={usuario.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono"></label>
          <input
            type="text"
            inputMode="tel"
            placeholder="Telefono"
            value={usuario.telefono}
            name="telefono"
            onChange={handleInputChange}
          />
        </div>

        <div className="confirm">
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="submit">Confirmar</button>
        </div>
      </form>

      <Link to="/admin" className="backBtn">
        Volver al Admin
      </Link>
    </div>
  );
};

export default User;
