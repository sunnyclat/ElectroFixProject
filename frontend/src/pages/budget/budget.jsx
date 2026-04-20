import "./budget.scss";
import { Link } from "react-router-dom";

import { useState } from "react";

const Budget = () => {
  const [receptionId, setReceptionId] = useState("");
  const [description, setDescription] = useState("");
  const [materialsList, setMaterialsList] = useState([]);
  const [materialInput, setMaterialInput] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const FormHandler = (e) => {
    e.preventDefault();

    if (!receptionId || !description|| !materialsList || !date) {
      setError("Por favor complete todos los campos antes de enviar.");
      return;
    }
  };

  const addMaterial = () => {
    if (materialInput) {
      setMaterialsList([...materialsList, materialInput]);
      setMaterialInput("");
    }
  };

  const removeMaterial = (indexToRemove) => {
    const updatedMaterialsList = materialsList.filter(
      (_, index) => index !== indexToRemove
    );
    setMaterialsList(updatedMaterialsList);
  };

  return (
    <div className="budgetWrapper">
      <h1 className="budgetTitle">Presupuesto</h1>
      <form className="budgetForm" onSubmit={FormHandler}>
        <label htmlFor="receptionId">ID Recepción</label>
        <input
          type="text"
          id="receptionId"
          className="formItem"
          value={receptionId}
          onChange={(e) => setReceptionId(e.target.value)}
        />
        <label htmlFor="description">Descripción de la reparación</label>
        <input
          type="text"
          id="description"
          className="formItem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="materialsList">Lista de materiales</label>
        <div className="materialsListContainer">
          <input
            type="text"
            id="materialsList"
            list="materials"
            className="formItem"
            value={materialInput}
            onChange={(e) => setMaterialInput(e.target.value)}
          />
          <datalist id="materials">
            <option value="Material 1" />
            <option value="Material 2" />
            <option value="Material 3" />
            <option value="Material 4" />
            <option value="Material 5" />
          </datalist>
          <button
            type="button"
            className="addMaterialBtn"
            onClick={addMaterial}
          >
            Agregar Material
          </button>
        </div>
        <ul className="materialList">
          {materialsList.map((material, index) => (
            <li key={index}>
              {material}
              <button
                type="button"
                className="removeMaterialBtn"
                onClick={() => removeMaterial(index)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <label htmlFor="date">Fecha validez garantía</label>
        <input
          type="date"
          id="date"
          className="formItem"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <h3 className="budgetCost">Costo total: $--</h3>

        {error && <p className="error"> {error} </p>}

        <button type="submit" className="submitBtn">
          Enviar
        </button>
      </form>
      <Link to="/" className="homeBtn">
        ← Volver al inicio
      </Link>
    </div>
  )
}

export default Budget