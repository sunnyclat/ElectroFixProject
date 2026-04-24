import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const deleteCliente = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        const response = await fetch(BASE_URL + `/usuario/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el cliente");
        }

        // Remove the deleted cliente from the state
        setClientes(prevClientes => prevClientes.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting cliente:", error);
        alert("Error al eliminar el cliente. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="listaPage">
      <h1>Lista de Clientes</h1>
      
       {loading ? (
         <p>Cargando...</p>
       ) : clientes.length === 0 ? (
         <div className="emptyState">
           <p>No hay clientes registrados.</p>
           <a href="/registro" className="registerLink">Registrar un nuevo cliente</a>
         </div>
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
               <th>Acciones</th>
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
                 <td className="actionButtons">
                   <Link to={`/client/${cli.id}`} className="actionLink">Editar</Link>
                   <button 
                     onClick={() => deleteCliente(cli.id)}
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

export default ListaClientes;