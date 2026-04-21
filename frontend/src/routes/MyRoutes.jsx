
import React from 'react';
import { Routes as ReactDOMRoutes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Budget from '../pages/budget/budget';
import Supplier from '../pages/supplier/supplier';
import User from '../pages/user/user';
import Reception from '../pages/reception/reception';
import Employees from '../pages/employees/employees';
import Material from '../pages/materials/materials';
import Registro from '../pages/registro/registro';
import Admin from '../pages/admin/admin';
import ListaClientes from '../pages/cliente-list/cliente-list';
import ListaEmpleados from '../pages/empleado-list/empleado-list';
import LoginAdmin from '../pages/login-admin/login-admin';
import ListaRecepciones from '../pages/recepciones-list/recepciones-list';


const MyRoutes = () => {
  return (
      <ReactDOMRoutes>
        <Route exact path="/" element={<Home />} />
        <Route path="/presupuesto" element={<Budget />} />
        <Route path="/proveedor" element={<Supplier />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/usuario" element={<User />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/empleados" element={<ListaEmpleados />} />
        <Route path="/recepciones" element={<ListaRecepciones />} />
        <Route path="/recepcion" element={<Reception />} />
        <Route path="/empleado" element={<Employees />} />
        <Route path="/material" element={<Material />} />
      </ReactDOMRoutes>
  );
};

export default MyRoutes;
