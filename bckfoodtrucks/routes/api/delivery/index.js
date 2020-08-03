// Rutas de la entidad de repartidores
var express = require("express");
var router = express.Router();

let deliveryModel = require("./delivery.model");

let init = async () => {
  await deliveryModel.initModel();
};
init();

router.use(async function (req, res, next) {
  //ruta solo para delivery
  if (req.user.roles.includes("delivery") && true) {
    router.get("/pedidos", async (req, res) => {
      //todos los que sean para delivery, esten aceptados, y no esten asignados
      try {
        let ordenes = await deliveryModel.getAllOrders("");
        res.status(200).json(ordenes);
      } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
      }
      //res.status(403).json({ msg: "No implementado" });
    });

    router.get("/pedido/:id", async (req, res) => {
      try {
        let { id } = req.params;
        let orden = await deliveryModel.getOrderOne(id);
        res.status(200).json(orden);
      } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
      }
      //ver pedido
      //res.status(403).json({ msg: "No implementado" });
    });

    router.post("/pedido/:id", async (req, res) => {
      //aceptar pedido
      try {
        let { id } = req.params;
        let orden = await deliveryModel.aceptarPedidoParaDelivery(
          id,
          req.user._id
        );
        res.status(200).json(orden);
      } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
      }
      //res.status(403).json({ msg: "No implementado" });
    });

    router.put("/pedido/recoger-orden/:id", async (req, res) => {
      //marcar orden como recogida status 4
      try {
        let { id } = req.params;
        var rslt = await deliveryModel.ChangeStatus(id, "recogido");
        res.status(200).json({ msg: "Orden actualizado" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Algo Sucendió mal!!" });
      }
      //res.status(403).json({ msg: "No implementado" });
    });

    router.put("/pedido/entregar-orden/:id", async (req, res) => {
      //marcar orden como entregada 5
      try {
        let { id } = req.params;
        var rslt = await deliveryModel.ChangeStatus(id, "entregado");
        res.status(200).json({ msg: "Orden actualizado" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Algo Sucendió mal!!" });
      }
      //res.status(403).json({ msg: "No implementado" });
    });

    router.get("/pedidos-aceptados", async (req, res) => {
      //todos los que sean para delivery, esten aceptados, y no esten asignados
      try {
        let ordenes = await deliveryModel.getAllOrders(req.user._id);
        res.status(200).json(ordenes);
      } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
      }
      //res.status(403).json({ msg: "No implementado" });
    });

    router.get("/pedidos-aceptados/:id", async (req, res) => {
      try {
        let { id } = req.params;
        let orden = await deliveryModel.getOrderOne(id);
        res.status(200).json(orden);
      } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
      }
      //ver pedido
      //res.status(403).json({ msg: "No implementado" });
    });
  } else {
    res.status(401).json({ msg: "No esta autorizado para estas rutas" });
  }
  next();
});

module.exports = router;
