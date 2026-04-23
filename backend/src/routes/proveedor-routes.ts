import { Proveedores } from "../controllers/proveedor";

const express = require("express");

const router = express.Router();

router.param("id", Proveedores.proveedoresRequestHandler);

// ========= Proveedores =========

router.post("/proveedor", Proveedores.create);
router.get("/proveedor", Proveedores.index);
router.get("/proveedor/:id", Proveedores.show);
router.put("/proveedor/:id", Proveedores.update);
router.delete("/proveedor/:id", Proveedores.delete);

// ========= Fin Proveedores =========

module.exports = router;
