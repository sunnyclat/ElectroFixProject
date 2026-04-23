import { useEffect, useRef, useState } from "react";
import "./style.scss";

import Button from "../../components/common/Button";
import NavLink from "../../components/common/NavLink";

const BASE_URL = "/api";

const initialSupplier = {
  name: "",
  email: "",
  telefono: "",
  detalles: "",
};

const Supplier = () => {
  const [supplier, setSupplier] = useState(initialSupplier);
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const loadSuppliers = async () => {
    try {
      const response = await fetch(BASE_URL + "/proveedor");
      const data = await response.json();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "telefono") {
      setSupplier((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, "").slice(0, 15),
      }));
      return;
    }

    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormState = () => {
    formRef.current?.reset();
    setSupplier(initialSupplier);
    setEditingSupplierId(null);
    setValidationError("");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      !supplier.name.trim() ||
      !supplier.email.trim() ||
      !supplier.telefono.trim() ||
      !supplier.detalles.trim()
    ) {
      setValidationError("Completa bien todos los campos.");
      return;
    }

    setValidationError("");
    setSubmitting(true);

    const isEditing = editingSupplierId !== null;

    try {
      const response = await fetch(
        BASE_URL + (isEditing ? `/proveedor/${editingSupplierId}` : "/proveedor"),
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...supplier,
            telefono: Number(supplier.telefono),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setValidationError(
          data.error ||
            (isEditing
              ? "No se pudo actualizar el proveedor."
              : "No se pudo registrar el proveedor.")
        );
        return;
      }

      resetFormState();
      await loadSuppliers();
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      setValidationError("Error de conexion.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setValidationError("");
    setEditingSupplierId(item.id);
    setSupplier({
      name: item.name ?? "",
      email: item.email ?? "",
      telefono: String(item.telefono ?? ""),
      detalles: item.detalles ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Querés eliminar este proveedor?");
    if (!confirmed) return;

    try {
      const response = await fetch(BASE_URL + `/proveedor/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "No se pudo eliminar el proveedor.");
        return;
      }

      if (editingSupplierId === id) {
        resetFormState();
      }

      await loadSuppliers();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      alert("Error de conexion.");
    }
  };

  return (
    <div id="SupplierWrapper">
      <h1>Proveedores</h1>

      <form className="formSupplier" onSubmit={handleForm} ref={formRef}>
        <h2>
          {editingSupplierId !== null
            ? "Editar proveedor"
            : "Registrar proveedor"}
        </h2>

        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={supplier.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={supplier.email}
          onChange={handleInputChange}
        />

        <label htmlFor="telefono">Telefono</label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          inputMode="numeric"
          value={supplier.telefono}
          onChange={handleInputChange}
        />

        <label htmlFor="detalles">Detalles</label>
        <textarea
          id="detalles"
          name="detalles"
          value={supplier.detalles}
          onChange={handleInputChange}
          rows={4}
        />

        {validationError && (
          <p className="errorValidation">{validationError}</p>
        )}

        <div className="formActions">
          <Button type={"submit"} className={"btnForm"}>
            {submitting
              ? "Guardando..."
              : editingSupplierId !== null
                ? "Guardar cambios"
                : "Guardar proveedor"}
          </Button>

          {editingSupplierId !== null && (
            <button
              type="button"
              className="secondaryBtn"
              onClick={resetFormState}
            >
              Cancelar edicion
            </button>
          )}
        </div>
      </form>

      <div className="supplierList">
        <h2>Listado de proveedores</h2>

        {loading ? (
          <p>Cargando proveedores...</p>
        ) : suppliers.length === 0 ? (
          <p>No hay proveedores registrados.</p>
        ) : (
          <table className="tablaUsuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Detalles</th>
                <th>Materiales</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.telefono}</td>
                  <td>{item.detalles}</td>
                  <td>{item.Materials?.length || 0}</td>
                  <td className="rowActions">
                    <button type="button" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <NavLink to={"/admin"} className={"homeBtn"}>
        Volver al Admin
      </NavLink>
    </div>
  );
};

export default Supplier;
