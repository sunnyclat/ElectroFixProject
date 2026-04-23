import { Materiales } from "../controllers/material";

const express = require("express");

const router = express.Router();

router.param("id", Materiales.MaterialsRequestHandler);

// ========= Materiales =========

router.post("/material", Materiales.create);
router.get("/material", Materiales.index);
router.get("/material/:id", Materiales.show);
router.put("/material/:id", Materiales.update);
router.delete("/material/:id", Materiales.delete);

// ========= Fin materiales =========

module.exports = router;
