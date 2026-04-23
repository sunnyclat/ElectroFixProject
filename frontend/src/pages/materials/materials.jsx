import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const BASE_URL = "/api";

const initialMaterial = {
  name: "",
  descripcion: "",
  stock: "",
  costo: "",
  proveedor_id: "",
};

const Materials = () => {
  const [material, setMaterial] = useState(initialMaterial);
  const [materials, setMaterials] = useState([]);
  const [providers, setProviders] = useState([]);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const loadMaterials = async () => {
    try {
      const response = await fetch(BASE_URL + "/material");
      const data = await response.json();
      setMaterials(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error("Error al cargar materiales:", loadError);
    } finally {
      setLoading(false);
    }
  };

  const loadProviders = async () => {
    try {
      const response = await fetch(BASE_URL + "/proveedor");
      const data = await response.json();
      setProviders(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error("Error al cargar proveedores:", loadError);
    }
  };

  useEffect(() => {
    loadMaterials();
    loadProviders();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "stock") {
      setMaterial((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ""),
      }));
      return;
    }

    if (name === "costo") {
      setMaterial((prev) => ({
        ...prev,
        [name]: value.replace(/[^\d.]/g, ""),
      }));
      return;
    }

    setMaterial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormState = () => {
    formRef.current?.reset();
    setMaterial(initialMaterial);
    setEditingMaterialId(null);
    setError("");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      !material.name.trim() ||
      !material.descripcion.trim() ||
      !material.stock.trim() ||
      !material.costo.trim() ||
      !material.proveedor_id
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setError("");
    setSubmitting(true);

    const isEditing = editingMaterialId !== null;

    try {
      const response = await fetch(
        BASE_URL + (isEditing ? `/material/${editingMaterialId}` : "/material"),
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...material,
            stock: Number(material.stock),
            costo: Number(material.costo),
            proveedor_id: Number(material.proveedor_id),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            (isEditing
              ? "No se pudo actualizar el material."
              : "No se pudo crear el material.")
        );
        return;
      }

      resetFormState();
      await loadMaterials();
    } catch (saveError) {
      console.error("Error al guardar material:", saveError);
      setError("Error de conexion.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setError("");
    setEditingMaterialId(item.id);
    setMaterial({
      name: item.name ?? "",
      descripcion: item.descripcion ?? "",
      stock: String(item.stock ?? ""),
      costo: String(item.costo ?? ""),
      proveedor_id: String(item.proveedor_id ?? ""),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Querés eliminar este material?");
    if (!confirmed) return;

    try {
      const response = await fetch(BASE_URL + `/material/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "No se pudo eliminar el material.");
        return;
      }

      if (editingMaterialId === id) {
        resetFormState();
      }

      await loadMaterials();
    } catch (deleteError) {
      console.error("Error al eliminar material:", deleteError);
      alert("Error de conexion.");
    }
  };

  return (
    <div className="materialsWrapper">
      <h1 className="title">Gestion de Materiales</h1>

      <form className="materialsForm" onSubmit={handleForm} ref={formRef}>
        <h2 className="formTitle">
          {editingMaterialId !== null ? "Editar material" : "Alta de materiales"}
        </h2>

        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          className="formItem"
          value={material.name}
          onChange={handleInputChange}
        />

        <label htmlFor="descripcion">Descripcion</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="formItem"
          value={material.descripcion}
          onChange={handleInputChange}
          rows={4}
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="text"
          inputMode="numeric"
          className="formItem"
          value={material.stock}
          onChange={handleInputChange}
        />

        <label htmlFor="costo">Costo</label>
        <input
          id="costo"
          name="costo"
          type="text"
          inputMode="decimal"
          className="formItem"
          value={material.costo}
          onChange={handleInputChange}
        />

        <label htmlFor="proveedor_id">Proveedor</label>
        <select
          id="proveedor_id"
          name="proveedor_id"
          className="formItem"
          value={material.proveedor_id}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar proveedor</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>

        {error && <p className="error">{error}</p>}

        <div className="formActions">
          <button type="submit" className="submitBtn">
            {submitting
              ? "Guardando..."
              : editingMaterialId !== null
                ? "Guardar cambios"
                : "Ingresar"}
          </button>

          {editingMaterialId !== null && (
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

      <div className="materialsList">
        <h2 className="listTitle">Listado de materiales</h2>

        {loading ? (
          <p>Cargando materiales...</p>
        ) : materials.length === 0 ? (
          <p>No hay materiales registrados.</p>
        ) : (
          <table className="tablaUsuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Stock</th>
                <th>Costo</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.stock}</td>
                  <td>{item.costo}</td>
                  <td>{item.Proveedor?.name || "-"}</td>
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

      <Link to="/admin" className="homeBtn">
        Volver al Admin
      </Link>
    </div>
  );
};

export default Materials;
