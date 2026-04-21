import React, { useState, useEffect } from "react";
import "./style.scss";

const BASE_URL = "/api";

const ListaRecepciones = () => {
  const [recepciones, setRecepciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL + "/recepcion")
      .then((res) => res.json())
      .then((data) => {
        setRecepciones(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="listaPage">
      <h1>Solicitudes de Diagnóstico</h1>
      
      {loading ? (
        <p>Cargando...</p>
      ) : recepciones.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table className="tablaUsuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Equipo</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {recepciones.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.first_name} {rec.last_name}</td>
                <td>{rec.email}</td>
                <td>{rec.telefono}</td>
                <td>{rec.equipo}</td>
                <td>{rec.tipo}</td>
                <td>{rec.descripcion}</td>
                <td>{rec.createdAt ? new Date(rec.createdAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <a href="/admin" className="backBtn">← Volver al Admin</a>
    </div>
  );
};

export default ListaRecepciones;