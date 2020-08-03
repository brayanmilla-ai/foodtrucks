// Rutas de la entidad de cliente
var express = require("express");
var router = express.Router();

let clienteModel = require("./cliente.model");

let init = async () => {
  await clienteModel.initModel();
};
init();

router.get("/restaurantes", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let restaurantes = await clienteModel.getAll();
      res.status(200).json(restaurantes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.get("/:idRest/items", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let { idRest } = req.params;
      let restaurantes = await clienteModel.getAllItems(idRest);
      res.status(200).json(restaurantes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.get("/:idRest/item/:id", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let { idRest, id } = req.params;
      const rlst = await clienteModel.getItem(id, idRest);
      res.status(200).json(rlst);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.post("/agregar-item/:itemId", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let { itemId } = req.params;
      var rslt = await clienteModel.addNewItem(itemId, req.user._id);
      res.status(200).json({ msg: "Item Añadido al carrito" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.delete("/elimintar-item/:itemId", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let { itemId } = req.params;
      var rslt = await clienteModel.delItemCarrito(itemId, req.user._id);
      res.status(200).json({ msg: "Item eliminado al carrito" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.get("/ordenes/all", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let user = req.user._id;
      let ordenes = await clienteModel.getAllOrders(user);
      res.status(200).json(ordenes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.get("/carrito", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let carrito = await clienteModel.getAllCarrito(req.user._id);
      res.status(200).json(carrito);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.post("/crear-orden", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      var rslt = await clienteModel.addNewOrder(req.user._id, req.body);
      res.status(200).json({ msg: "orden creada" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.get("/orden/:id", async (req, res) => {
  //Ruta solo para clientes
  if (req.user.roles.includes("cliente") && true) {
    try {
      let { id } = req.params;
      let orden = await clienteModel.getOrderOne(id);
      res.status(200).json(orden);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({
      msg: "No esta autorizado a usar esta ruta",
    });
  }
  //res.status(403).json({ msg: "No implementado" });
});

module.exports = router;
