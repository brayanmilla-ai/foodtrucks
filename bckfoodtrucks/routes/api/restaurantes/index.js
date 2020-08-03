// Rutas de la entidad de restaurantes
var express = require("express");
var router = express.Router();
var privateRouter = express.Router();

let restaurantesModel = require("./restaurantes.model");

let init = async () => {
  await restaurantesModel.initModel();
};
init();

const path = require("path");
const multer = require("multer");
const { url } = require("inspector");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
//******************************************************************************************** */

privateRouter.get("/ordenes", async (req, res) => {
  //solo para clientes y restaurantes
  if (req.user.roles.includes("restaurante") && true) {
    try {
      let ordenes = await restaurantesModel.getAllOrders();
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

privateRouter.get("/all", async (req, res) => {
  if (req.user.roles.includes("admin") && true) {
    try {
      let restaurantes = await restaurantesModel.getAll();
      res.status(200).json(restaurantes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
});

privateRouter.get("/all-own", async (req, res) => {
  if (req.user.roles.includes("restaurante") && true) {
    try {
      var id = req.user._id;
      console.log(id);
      let restaurantes = await restaurantesModel.getAllOwn(id);
      res.status(200).json(restaurantes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
});

privateRouter.get("/orden/:id", async (req, res) => {
  //solo para clientes y restaurantes
  if (req.user.roles.includes("restaurante") && true) {
    try {
      let { id } = req.params;
      let orden = await restaurantesModel.getOrderOne(id);
      res.status(200).json(orden);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
  //res.status(403).json({ msg: "No implementado" });
});

privateRouter.put("/aceptar-orden/:id", async (req, res) => {
  if (req.user.roles.includes("restaurante") && true) {
    try {
      let { id } = req.params;
      var rslt = await restaurantesModel.ChangeStatus(id, "aceptar");
      res.status(200).json({ msg: "Orden actualizado" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
  //res.status(403).json({ msg: "No implementado" });
});

privateRouter.put("/marcar-orden-listo/:id", async (req, res) => {
  if (req.user.roles.includes("restaurante") && true) {
    try {
      let { id } = req.params;
      var rslt = await restaurantesModel.ChangeStatus(id, "listo");
      res.status(200).json({ msg: "Orden actualizado" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
  //res.status(403).json({ msg: "No implementado" });
});

privateRouter.put("/cancelar-orden/:id", async (req, res) => {
  if (req.user.roles.includes("restaurante") && true) {
    try {
      let { id } = req.params;
      var rslt = await restaurantesModel.ChangeStatus(id, "cancelado");
      res.status(200).json({ msg: "Orden actualizado" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
  //res.status(403).json({ msg: "No implementado" });
});

privateRouter.put("/marcar-orden-entregada/:id", async (req, res) => {
  if (req.user.roles.includes("restaurante") && true) {
    try {
      let { id } = req.params;
      var rslt = await restaurantesModel.ChangeStatus(id, "entregado");
      res.status(200).json({ msg: "Orden actualizado Entregado" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Algo Sucendió mal!!" });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }
  //res.status(403).json({ msg: "No implementado" });
});

router.get("/:id/items", async (req, res) => {
  try {
    let { id } = req.params;
    let restaurantes = await restaurantesModel.getAllItems(id);
    res.status(200).json(restaurantes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
  }
  //res.status(403).json({ msg: "No implementado" });
});

privateRouter.post(
  "/:id/items/nuevo",
  upload.single("file"),
  async (req, res) => {
    if (req.user.roles.includes("restaurante") && true) {
      try {
        var urlimg = "/images/" + req.file.filename;
        let { id } = req.params;
        var rslt = await restaurantesModel.addNewItem(req.body, urlimg, id);
        console.log("storage location is " + urlimg);
        var s = req.file;
        res.status(200).json({ msg: "Item Creado", s });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Algo Sucendió mal!!" });
      }
    } else {
      res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
    }

    //res.status(403).json({ msg: "No implementado" });
  }
);

privateRouter.put(
  "/:idRes/items/editar/:id",
  upload.single("file"),
  async (req, res) => {
    if (req.user.roles.includes("restaurante") && true) {
      try {
        var urlimg = "/images/" + req.file.filename;
        let { idRes, id } = req.params;
        const rlst = await restaurantesModel.updateItem(
          id,
          req.body,
          idRes,
          urlimg
        );
        res.status(200).json(rlst);
      } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
      }
    } else {
      res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
    }
    //res.status(403).json({ msg: "No implementado" });
  }
);

privateRouter.delete("/:idRes/items/eliminar/:id", async (req, res) => {
  if (req.user.roles.includes("restaurante") && true) {
    try {
      const { idRes, id } = req.params;
      const result = await restaurantesModel.deleteOne(id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Algo Sucedio Mal intentar de nuevo." });
    }
  } else {
    res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
  }

  //res.status(403).json({ msg: "No implementado" });
});

privateRouter.post(
  "/crear-restaurante",
  upload.single("file"),
  async (req, res) => {
    if (req.user.roles.includes("restaurante") && true) {
      try {
        var urlimg = "/images/" + req.file.filename;
        var rslt = await restaurantesModel.addnew(
          req.body,
          urlimg,
          req.user._id
        );
        console.log("storage location is " + urlimg);
        var s = req.file;
        res.status(200).json({ msg: "Restaurante Creado", s });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Algo Sucendió mal!!" });
      }
    } else {
      res.status(401).json({ msg: "No esta autorizado a usar esta ruta" });
    }

    //res.status(403).json({ msg: "No implementado" });
  }
);

module.exports = {
  restaurantesRoutesPub: router,
  restaurantesRoutesPriv: privateRouter,
};
