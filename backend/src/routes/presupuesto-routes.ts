import { Presupuestos } from "../controllers/presupuesto";

const express = require("express");

const router = express.Router();

router.param("id", Presupuestos.presupuestosRequestHandler);

// ========= Presupuestos =========

router.post("/presupuesto", Presupuestos.create);
router.get("/presupuesto", Presupuestos.index);
router.get("/presupuesto/:id", Presupuestos.show);
router.put("/presupuesto/:id", Presupuestos.update);
router.delete("/presupuesto/:id", Presupuestos.delete);

// ========= Fin Presupuestos =========

module.exports = router;
