import React, { useState } from "react";
import "./styleList.scss";
import { Link } from "react-router-dom";

const ClientList = () => {
  const [clientes] = useState([]);

  return (
    <div>
      <h1>LISTA DE CLIENTES</h1>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((client, index) => {
            return (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.Email}</td>
                <td>{client.Phone}</td>
                <td>{client.Addres}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="footer">
        <Link to="/" className="homeBtn">
          {" "}
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ClientList;
