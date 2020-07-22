// Rutas de la entidad de restaurantes
var express = require("express");
var router = express.Router();

router.get("/ordenes", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.get("/orden/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.put("/aceptar-orden/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.put("/marcar-orden-listo/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.put("/cancelar-orden/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.get("/items", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.post("/items/nuevo", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.put("/items/editar/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.delete("/items/eliminar/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

module.exports = router;
