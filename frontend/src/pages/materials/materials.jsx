import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Materials = () => {
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [brand, setBrand] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("");

  const validForm = () => {
    if (!description || !type|| !brand || !amount ) {
      setError("Por favor complete todos los campos");
      return;
    }
  }

  const handleForm = (e) => {
    e.preventDefault();
    let data = {
      desc: description,
      type: type,
      brand: brand,
      amount: amount
    }

    validForm()
  }

  return (
    <div className="materialsWrapper">
      <h1 className="title">Alta de Materiales</h1>
      
      <form className="materialsForm" onSubmit={handleForm}>

        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          type="text"
          className="formItem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="type">Tipo</label>
        <select
          id="type"
          className="formItem"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Seleccionar rol</option>
          <option value="Nacional">Nacional</option>
          <option value="Importado">Importado</option>
        </select>
        <label htmlFor="brand">Marca</label>
        <input
          id="brand"
          type="text"
          className="formItem"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <label htmlFor="amount">Costo</label>
        <input
          id="amount"
          type="text"
          className="formItem"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="error"> {error} </p>}
        <button type="submit" className="submitBtn">
          Ingresar
        </button>

      </form>
      <Link to="/" className="homeBtn">
        {" "}
        ← Volver al inicio
      </Link>
    </div>
  )
}

export default Materials
