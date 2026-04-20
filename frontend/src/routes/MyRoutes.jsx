
import React from 'react';
import { BrowserRouter, Routes as ReactDOMRoutes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Budget from '../pages/budget/budget';
import Supplier from '../pages/supplier/supplier';
import User from '../pages/user/user';
import Client from '../pages/client/client';
import Reception from '../pages/reception/reception';
import Employees from '../pages/employees/employees';
import Material from '../pages/materials/materials';


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <ReactDOMRoutes>
        <Route exact path="/" element={<Home />} />
        <Route path="/presupuesto" element={<Budget />} />
        <Route path="/proveedor" element={<Supplier />} />
        <Route path="/usuario" element={<User />} />
        <Route path="/cliente" element={<Client />} />
        <Route path="/recepcion" element={<Reception />} />
        <Route path="/empleado" element={<Employees />} />
        <Route path="/material" element={<Material
         />} />
      </ReactDOMRoutes>
    </BrowserRouter>
  );
};

export default MyRoutes;
