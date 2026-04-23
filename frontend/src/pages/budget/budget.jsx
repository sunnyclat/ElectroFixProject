import "./budget.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

const BASE_URL = "/api";

const initialBudget = {
  recepcion_id: "",
  descripcion: "",
  estado: "pendiente",
  confirmado: false,
  materialIds: [],
};

const Budget = () => {
  const [searchParams] = useSearchParams();
  const [budget, setBudget] = useState(initialBudget);
  const [budgets, setBudgets] = useState([]);
  const [receptions, setReceptions] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const selectedReceptionId = searchParams.get("recepcionId");

  const selectedTotal = useMemo(
    () =>
      budget.materialIds.reduce((total, materialId) => {
        const material = materials.find((item) => item.id === materialId);
        return total + (material?.costo || 0);
      }, 0),
    [budget.materialIds, materials]
  );

  const loadBudgets = async () => {
    try {
      const response = await fetch(BASE_URL + "/presupuesto");
      const data = await response.json();
      setBudgets(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error("Error al cargar presupuestos:", loadError);
    } finally {
      setLoading(false);
    }
  };

  const loadReceptions = async () => {
    try {
      const response = await fetch(BASE_URL + "/recepcion");
      const data = await response.json();
      setReceptions(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error("Error al cargar recepciones:", loadError);
    }
  };

  const loadMaterials = async () => {
    try {
      const response = await fetch(BASE_URL + "/material");
      const data = await response.json();
      setMaterials(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error("Error al cargar materiales:", loadError);
    }
  };

  useEffect(() => {
    loadBudgets();
    loadReceptions();
    loadMaterials();
  }, []);

  useEffect(() => {
    if (!selectedReceptionId || budgets.length === 0) {
      if (selectedReceptionId && editingBudgetId === null) {
        setBudget((prev) => ({
          ...prev,
          recepcion_id: selectedReceptionId,
        }));
        setInfoMessage("Creando presupuesto para la recepcion seleccionada.");
      }
      return;
    }

    const matchingBudgets = budgets
      .filter((item) => String(item.recepcion_id) === String(selectedReceptionId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (matchingBudgets.length > 0) {
      const item = matchingBudgets[0];
      setEditingBudgetId(item.id);
      setBudget({
        recepcion_id: String(item.recepcion_id ?? ""),
        descripcion: item.descripcion ?? "",
        estado: item.estado ?? "pendiente",
        confirmado: Boolean(item.confirmado),
        materialIds: Array.isArray(item.materiales)
          ? item.materiales.map((material) => material.id)
          : [],
      });
      setInfoMessage(
        `La recepcion #${selectedReceptionId} ya tiene presupuesto. Se cargo el mas reciente para editar.`
      );
      return;
    }

    setEditingBudgetId(null);
    setBudget((prev) => ({
      ...prev,
      recepcion_id: selectedReceptionId,
    }));
    setInfoMessage("Creando presupuesto para la recepcion seleccionada.");
  }, [selectedReceptionId, budgets]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setBudget((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMaterialToggle = (materialId) => {
    setBudget((prev) => ({
      ...prev,
      materialIds: prev.materialIds.includes(materialId)
        ? prev.materialIds.filter((id) => id !== materialId)
        : [...prev.materialIds, materialId],
    }));
  };

  const resetFormState = () => {
    formRef.current?.reset();
    setBudget({
      ...initialBudget,
      recepcion_id: selectedReceptionId || "",
    });
    setEditingBudgetId(null);
    setError("");
    setInfoMessage(
      selectedReceptionId
        ? "Creando presupuesto para la recepcion seleccionada."
        : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!budget.recepcion_id || !budget.descripcion.trim() || !budget.estado) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    setError("");
    setSubmitting(true);

    const isEditing = editingBudgetId !== null;

    try {
      const response = await fetch(
        BASE_URL + (isEditing ? `/presupuesto/${editingBudgetId}` : "/presupuesto"),
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descripcion: budget.descripcion,
            recepcion_id: Number(budget.recepcion_id),
            estado: budget.estado,
            confirmado: Boolean(budget.confirmado),
            materialIds: budget.materialIds,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            (isEditing
              ? "No se pudo actualizar el presupuesto."
              : "No se pudo crear el presupuesto.")
        );
        return;
      }

      resetFormState();
      await loadBudgets();
    } catch (saveError) {
      console.error("Error al guardar presupuesto:", saveError);
      setError("Error de conexion.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setError("");
    setInfoMessage("");
    setEditingBudgetId(item.id);
    setBudget({
      recepcion_id: String(item.recepcion_id ?? ""),
      descripcion: item.descripcion ?? "",
      estado: item.estado ?? "pendiente",
      confirmado: Boolean(item.confirmado),
      materialIds: Array.isArray(item.materiales)
        ? item.materiales.map((material) => material.id)
        : [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Querés eliminar este presupuesto?");
    if (!confirmed) return;

    try {
      const response = await fetch(BASE_URL + `/presupuesto/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "No se pudo eliminar el presupuesto.");
        return;
      }

      if (editingBudgetId === id) {
        resetFormState();
      }

      await loadBudgets();
    } catch (deleteError) {
      console.error("Error al eliminar presupuesto:", deleteError);
      alert("Error de conexion.");
    }
  };

  return (
    <div className="budgetWrapper">
      <h1 className="budgetTitle">Presupuestos</h1>

      <form className="budgetForm" onSubmit={handleSubmit} ref={formRef}>
        <h2 className="formTitle">
          {editingBudgetId !== null
            ? "Editar presupuesto"
            : "Crear presupuesto"}
        </h2>

        {infoMessage && <p className="infoMessage">{infoMessage}</p>}

        <label htmlFor="recepcion_id">Recepcion</label>
        <select
          id="recepcion_id"
          name="recepcion_id"
          className="formItem"
          value={budget.recepcion_id}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar recepcion</option>
          {receptions.map((reception) => (
            <option key={reception.id} value={reception.id}>
              #{reception.id} - {reception.first_name} {reception.last_name} -{" "}
              {reception.equipo}
            </option>
          ))}
        </select>

        <label htmlFor="descripcion">Descripcion de la reparacion</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="formItem descriptionInput"
          value={budget.descripcion}
          onChange={handleInputChange}
          rows={5}
        />

        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          className="formItem"
          value={budget.estado}
          onChange={handleInputChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en revision">En revision</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>

        <label className="checkboxRow">
          <input
            type="checkbox"
            name="confirmado"
            checked={budget.confirmado}
            onChange={handleInputChange}
          />
          Confirmado
        </label>

        <div className="materialsSelector">
          <p className="materialsTitle">Materiales</p>
          {materials.length === 0 ? (
            <p>No hay materiales cargados.</p>
          ) : (
            <div className="materialsGrid">
              {materials.map((material) => (
                <label key={material.id} className="materialOption">
                  <input
                    type="checkbox"
                    checked={budget.materialIds.includes(material.id)}
                    onChange={() => handleMaterialToggle(material.id)}
                  />
                  <span>
                    {material.name} - ${material.costo}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <h3 className="budgetCost">Costo total: ${selectedTotal.toFixed(2)}</h3>

        {error && <p className="error">{error}</p>}

        <div className="formActions">
          <button type="submit" className="submitBtn">
            {submitting
              ? "Guardando..."
              : editingBudgetId !== null
                ? "Guardar cambios"
                : "Crear presupuesto"}
          </button>

          {editingBudgetId !== null && (
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

      <div className="budgetList">
        <h2 className="listTitle">Listado de presupuestos</h2>

        {loading ? (
          <p>Cargando presupuestos...</p>
        ) : budgets.length === 0 ? (
          <p>No hay presupuestos registrados.</p>
        ) : (
          <table className="tablaUsuarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Recepcion</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Confirmado</th>
                <th>Materiales</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((item) => {
                const total = Array.isArray(item.materiales)
                  ? item.materiales.reduce(
                      (sum, material) => sum + (material.costo || 0),
                      0
                    )
                  : 0;

                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      #{item.Recepcion?.id || item.recepcion_id} -{" "}
                      {item.Recepcion?.equipo || "-"}
                    </td>
                    <td>{item.descripcion}</td>
                    <td>{item.estado}</td>
                    <td>{item.confirmado ? "Si" : "No"}</td>
                    <td>{item.materiales?.length || 0}</td>
                    <td>${total.toFixed(2)}</td>
                    <td className="rowActions">
                      <button type="button" onClick={() => handleEdit(item)}>
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
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

export default Budget;
