import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "/api";

const Employees = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await fetch(BASE_URL + "/rol");
        const data = await response.json();
        const roles = Array.isArray(data) ? data : [];
        const employeeRoles = roles.filter((r) =>
          ["tecnico", "administrativo", "atencion al cliente"].includes(
            r.descripcion?.toLowerCase()
          )
        );
        setAvailableRoles(employeeRoles);
      } catch (err) {
        console.error("Error al cargar roles:", err);
      }
    };
    loadRoles();
  }, []);

  const FormHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!dni || !name || !surname || !phone || !email || !rol || !password) {
      setError("Por favor complete todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un email valido");
      return;
    }

    const phoneRegex = /^[0-9+]{7,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ""))) {
      setError("Por favor ingrese un telefono valido");
      return;
    }

    setSubmitting(true);

    try {
      const checkResponse = await fetch(BASE_URL + `/usuario/${dni}`);
      if (checkResponse.ok) {
        setError("Ya existe un usuario con ese DNI");
        setSubmitting(false);
        return;
      }

      const payload = {
        id: Number(dni),
        first_name: name.trim(),
        last_name: surname.trim(),
        email: email.trim(),
        password: password,
        telefono: Number(phone.replace(/[^0-9]/g, "")),
        rol: Number(rol),
      };

      const response = await fetch(BASE_URL + "/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo registrar el empleado");
      }

      setSuccess("Empleado registrado exitosamente");
      setDni("");
      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setRol("");
      setPassword("");

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error("Error al registrar empleado:", err);
      setError(err.message || "Error de conexion. Intente nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="employeesWraper">
      <h1 className="employeesTitle">Registro de Empleado</h1>
      <form className="employeesForm" onSubmit={FormHandler}>
        <input
          type="text"
          placeholder="DNI / Cedula"
          className="formItem"
          value={dni}
          onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          className="formItem"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          className="formItem"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="formItem"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefono"
          className="formItem"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <select
          name="rol"
          placeholder="Rol del empleado"
          className="formItem"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          required
        >
          <option value="">Seleccionar rol</option>
          {availableRoles.map((r) => (
            <option key={r.id_rol} value={r.id_rol}>
              {r.descripcion}
            </option>
          ))}
        </select>
        <input
          type="password"
          placeholder="Contrasena"
          className="formItem"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
        <button type="submit" className="submitBtn" disabled={submitting}>
          {submitting ? "Registrando..." : "Confirmar"}
        </button>
      </form>
      <Link to="/admin" className="homeBtn">
        ← Volver al panel
      </Link>
    </div>
  );
};

export default Employees;