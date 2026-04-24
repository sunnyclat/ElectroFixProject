import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const BASE_URL = "/api";

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL + "/usuario/empleados")
      .then((res) => res.json())
      .then((data) => {
        setEmpleados(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const deleteEmpleado = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
      try {
        const response = await fetch(BASE_URL + `/usuario/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el empleado");
        }

        // Remove the deleted empleado from the state
        setEmpleados(prevEmpleados => prevEmpleados.filter(e => e.id !== id));
      } catch (error) {
        console.error("Error deleting empleado:", error);
        alert("Error al eliminar el empleado. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="listaPage">
      <h1>Lista de Empleados</h1>
      
      {loading ? (
        <p>Cargando...</p>
      ) : empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table className="tablaUsuarios">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.telefono}</td>
                <td>{emp.Rol?.descripcion || emp.rol}</td>
                <td className="actionButtons">
                  <Link to={`/empleado/${emp.id}`} className="actionLink">Editar</Link>
                  <button 
                    onClick={() => deleteEmpleado(emp.id)}
                    className="deleteBtn"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <a href="/admin" className="backBtn">← Volver al Admin</a>
    </div>
  );
};

export default ListaEmpleados;