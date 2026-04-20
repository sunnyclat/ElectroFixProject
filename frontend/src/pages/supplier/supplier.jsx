import { useState } from "react";
import "./style.scss";


import Button from "../../components/common/Button";
import NavLink from "../../components/common/NavLink";

const Supplier = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [typeParts, setTypeParts] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(true);

  const handleForm = (e) => {
    e.preventDefault();
    if (!name || !brand || !typeParts || !email || !phone) {
      setValidation(false)
      
    }else{
      setValidation(true)
      console.log("Send Form")
    }
  };

  return (
    <div id="SupplierWrapper">
      <h1>Proveedores</h1>
      <form className="formSupplier" onSubmit={handleForm}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="brand">Marca</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        ></input>

        <label htmlFor="typeParts">Tipo de Repuestos</label>
        <input
          id="typeParts"
          type="text"
          value={typeParts}
          onChange={(e) => setTypeParts(e.target.value)}
        ></input>

        <label htmlFor="mail">Email</label>
        <input
          id="mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="phone">Telefono</label>
        <input
          id="phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        {!validation && <p className="errorValidation">Complete bien todos los campos</p>}
        <Button
          type={"submit"}
          className={"btnForm"}
        >
          Enviar
        </Button>
      </form>
      <NavLink to={"/"} className={"homeBtn"}>
        ← Volver al inicio
      </NavLink>
    </div>
  );
};

export default Supplier;
