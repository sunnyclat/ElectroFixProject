import React, { useState } from "react";
import "./style.scss";

const BASE_URL = "/api";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Intentando login con:", email);

    fetch(BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json().then(data => ({ status: res.status, data }));
      })
      .then(({ status, data }) => {
        setLoading(false);
        console.log("Response data:", data);
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/admin";
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
        setError("Error de conexión");
      });
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1>ElectroFix Admin</h1>
        <p>Ingresá con tu cuenta de empleado</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="error">{error}</p>}
          
          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        
        <a href="/" className="backLink">← Volver al inicio</a>
      </div>
    </div>
  );
};

export default LoginAdmin;