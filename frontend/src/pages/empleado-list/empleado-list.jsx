import React, { useState, useEffect } from "react";
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