import React, { useState, useEffect } from "react";
import "./style.scss";

const BASE_URL = "/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    empleados: 0,
    recepciones: 0,
    presupuestos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL + "/usuario/clientes")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({ ...prev, clientes: Array.isArray(data) ? data.length : 0 }));
      })
      .catch(() => {});

    fetch(BASE_URL + "/usuario/empleados")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({ ...prev, empleados: Array.isArray(data) ? data.length : 0 }));
      })
      .catch(() => {});

    fetch(BASE_URL + "/recepcion")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({ ...prev, recepciones: Array.isArray(data) ? data.length : 0 }));
      })
      .catch(() => {});

    fetch(BASE_URL + "/presupuesto")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({ ...prev, presupuestos: Array.isArray(data) ? data.length : 0 }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const menuItems = [
    { title: "Usuarios", subtitle: "Registrar empleados", icon: "👥", link: "/usuario" },
    { title: "Clientes", subtitle: "Ver lista de clientes", icon: "🧑", link: "/clientes" },
    { title: "Empleados", subtitle: "Ver lista de empleados", icon: "👨‍🔧", link: "/empleados" },
    { title: "Recepciones", subtitle: "Solicitudes de diagnóstico", icon: "📋", link: "/recepciones" },
    { title: "Presupuestos", subtitle: "Gestionar presupuestos", icon: "💰", link: "/presupuesto" },
    { title: "Materiales", subtitle: "Inventario de materiales", icon: "🔧", link: "/material" },
    { title: "Proveedores", subtitle: "Gestionar proveedores", icon: "🏭", link: "/proveedor" },
  ];

  return (
    <div className="adminDashboard">
      <h1>Panel de Administración</h1>
      
      <div className="statsContainer">
        <div className="statCard">
          <span className="statNumber">{stats.clientes}</span>
          <span className="statLabel">Clientes</span>
        </div>
        <div className="statCard">
          <span className="statNumber">{stats.empleados}</span>
          <span className="statLabel">Empleados</span>
        </div>
        <div className="statCard">
          <span className="statNumber">{stats.recepciones}</span>
          <span className="statLabel">Recepciones</span>
        </div>
        <div className="statCard">
          <span className="statNumber">{stats.presupuestos}</span>
          <span className="statLabel">Presupuestos</span>
        </div>
      </div>

      <div className="menuGrid">
        {menuItems.map((item, index) => (
          <a key={index} href={item.link} className="menuCard">
            <span className="menuIcon">{item.icon}</span>
            <div className="menuContent">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;