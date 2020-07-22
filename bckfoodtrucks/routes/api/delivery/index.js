// Rutas de la entidad de repartidores
var express = require("express");
var router = express.Router();

router.use(function (req, res, next) {
  if (req.user.roles.includes("delivery") && true) {
    router.get("/pedidos", function (req, res) {
      res.status(403).json({ msg: "No implementado" });
    });

    router.get("/pedido/:id", function (req, res) {
      res.status(403).json({ msg: "No implementado" });
    });

    router.post("/pedido/:id", function (req, res) {
      res.status(403).json({ msg: "No implementado" });
    });

    router.put("/pedido/recoger-orden/:id", function (req, res) {
      res.status(403).json({ msg: "No implementado" });
    });

    router.put("/pedido/entregar-orden/:id", function (req, res) {
      res.status(403).json({ msg: "No implementado" });
    });
  } else {
    res.status(401).json({ msg: "No esta autorizado para estas rutas" });
  }
  next();
});

module.exports = router;
