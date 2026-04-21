import React, { useState, useEffect } from "react";
import "./style.scss";

const BASE_URL = "/api";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL + "/usuario/clientes")
      .then((res) => res.json())
      .then((data) => {
        setClientes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="listaPage">
      <h1>Lista de Clientes</h1>
      
      {loading ? (
        <p>Cargando...</p>
      ) : clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table className="tablaUsuarios">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Condición IVA</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.id}>
                <td>{cli.id}</td>
                <td>{cli.first_name}</td>
                <td>{cli.last_name}</td>
                <td>{cli.email}</td>
                <td>{cli.telefono}</td>
                <td>{cli.condicion_iva}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <a href="/admin" className="backBtn">← Volver al Admin</a>
    </div>
  );
};

export default ListaClientes;