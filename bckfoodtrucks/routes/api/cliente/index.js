// Rutas de la entidad de cliente
var express = require("express");
var router = express.Router();

router.get("/restaurantes", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.get("/:idRest/items", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.get("/:idRest/item/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.post("/agregar-item/:itemId", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.delete("/elimintar-item/:itemId", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.get("/ordenes/all", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

router.get("/orden/:id", function (req, res) {
  res.status(403).json({ msg: "No implementado" });
});

module.exports = router;
