import "./employees.scss";
import { Link } from "react-router-dom";

import { useState } from "react";

const Employees = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const FormHandler = (e) => {
    e.preventDefault();

    if (!name || !surname || !phone || !email || !rol || !password) {
      setError("Por favor complete todos los campos");
      return;
    }
  };

  return (
    <div className="employeesWraper">
      <h1 className="employeesTitle">Empleados</h1>
      <form className="employeesForm" onSubmit={FormHandler}>

        
        <input
          type="text"
          placeholder="Nombre"
          className="formItem"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="formItem"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="formItem"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="formItem"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          name="rol"
          placeholder="Rol del empleado"
          className="formItem"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="">Seleccionar rol</option>
          <option value="tecnico">Técnico</option>
          <option value="administrativo">Administrativo</option>
          <option value="atencion">Atención al cliente</option>
        </select>
        <input
          type="password"
          placeholder="Contraseña"
          className="formItem"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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

export default Employees;
