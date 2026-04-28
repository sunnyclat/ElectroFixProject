import React, { useState, useEffect } from "react";
import "./styleList.scss";
import { Link } from "react-router-dom";

const ClientList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const response = await fetch("/api/usuario/clientes");
        if (!response.ok) {
          throw new Error("Error al cargar clientes");
        }
        const data = await response.json();
        setClientes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los clientes");
      } finally {
        setLoading(false);
      }
    };
    loadClientes();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>LISTA DE CLIENTES</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>LISTA DE CLIENTES</h1>

      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="5">No hay clientes registrados</td>
            </tr>
          ) : (
            clientes.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.email}</td>
                <td>{client.telefono}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="footer">
        <Link to="/" className="homeBtn">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ClientList;