import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const BASE_URL = "/api";

const ListaRecepciones = () => {
  const [recepciones, setRecepciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recepRes, empsRes] = await Promise.all([
        fetch(BASE_URL + "/recepcion"),
        fetch(BASE_URL + "/usuario/empleados"),
      ]);
      const recepData = await recepRes.json();
      const empsData = await empsRes.json();
      setRecepciones(Array.isArray(recepData) ? recepData : []);
      setEmpleados(Array.isArray(empsData) ? empsData : []);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecepcion = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta recepción?")) {
      try {
        const response = await fetch(BASE_URL + `/recepcion/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar la recepción");
        }

        setRecepciones((prev) => prev.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Error deleting reception:", error);
        alert("Error al eliminar la recepción. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const asignarEmpleado = async (recepcionId, empleadoId) => {
    setUpdating((prev) => ({ ...prev, [recepcionId]: true }));
    try {
      const response = await fetch(BASE_URL + `/recepcion/${recepcionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_id: empleadoId || null }),
      });

      if (!response.ok) {
        throw new Error("Error al asignar empleado");
      }

      const updated = await response.json();
      setRecepciones((prev) =>
        prev.map((r) => (r.id === recepcionId ? { ...r, Employee: updated.Employee || null } : r))
      );
    } catch (error) {
      console.error("Error asignando empleado:", error);
      alert("Error al asignar empleado. Intente nuevamente.");
    } finally {
      setUpdating((prev) => ({ ...prev, [recepcionId]: false }));
    }
  };

  const getLatestBudget = (reception) => {
    if (!Array.isArray(reception.presupuestos) || reception.presupuestos.length === 0) {
      return null;
    }

    return [...reception.presupuestos].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  };

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "pendiente":
        return { color: "#ff9800" };
      case "aprobado":
        return { color: "#4caf50" };
      case "rechazado":
        return { color: "#f44336" };
      case "en_revision":
        return { color: "#2196f3" };
      default:
        return { color: "#607d8b" };
    }
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
              <th>Empleado</th>
              <th>Presupuesto</th>
              <th>Estado</th>
              <th>Accion</th>
              <th>Eliminar</th>
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
                  <td>
                    <select
                      value={rec.Employee?.id || ""}
                      onChange={(e) => asignarEmpleado(rec.id, Number(e.target.value) || null)}
                      disabled={updating[rec.id]}
                      className="empleadoSelect"
                    >
                      <option value="">Sin asignar</option>
                      {empleados
                        .filter(
                          (emp) =>
                            emp.Rol?.descripcion?.toLowerCase() === "tecnico" ||
                            emp.Rol?.descripcion?.toLowerCase() === "administrativo" ||
                            emp.Rol?.descripcion?.toLowerCase() === "atencion al cliente"
                        )
                        .map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.first_name} {emp.last_name}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>{latestBudget ? `#${latestBudget.id}` : "Sin presupuesto"}</td>
                  <td style={latestBudget ? getEstadoStyle(latestBudget.estado) : {}}>
                    {latestBudget ? latestBudget.estado : "-"}
                  </td>
                  <td>
                    <Link
                      to={`/presupuesto?recepcionId=${rec.id}`}
                      className="actionLink"
                    >
                      {latestBudget ? "Ver presupuesto" : "Crear presupuesto"}
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteRecepcion(rec.id)}
                      className="deleteBtn"
                    >
                      Eliminar
                    </button>
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