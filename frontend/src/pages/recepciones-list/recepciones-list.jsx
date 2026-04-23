import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const getLatestBudget = (reception) => {
    if (!Array.isArray(reception.presupuestos) || reception.presupuestos.length === 0) {
      return null;
    }

    return [...reception.presupuestos].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  };

  return (
    <div className="listaPage">
      <h1>Solicitudes de Diagnostico</h1>

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
              <th>Telefono</th>
              <th>Equipo</th>
              <th>Descripcion</th>
              <th>Fecha visita</th>
              <th>Presupuesto</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {recepciones.map((rec) => {
              const latestBudget = getLatestBudget(rec);

              return (
                <tr key={rec.id}>
                  <td>{rec.id}</td>
                  <td>
                    {rec.first_name} {rec.last_name}
                  </td>
                  <td>{rec.email}</td>
                  <td>{rec.telefono}</td>
                  <td>{rec.equipo}</td>
                  <td>{rec.descripcion}</td>
                  <td>
                    {rec.fecha_visita
                      ? new Date(rec.fecha_visita).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{latestBudget ? `#${latestBudget.id}` : "Sin presupuesto"}</td>
                  <td>{latestBudget ? latestBudget.estado : "-"}</td>
                  <td>
                    <Link
                      to={`/presupuesto?recepcionId=${rec.id}`}
                      className="actionLink"
                    >
                      {latestBudget ? "Ver presupuesto" : "Crear presupuesto"}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <a href="/admin" className="backBtn">
        Volver al Admin
      </a>
    </div>
  );
};

export default ListaRecepciones;
