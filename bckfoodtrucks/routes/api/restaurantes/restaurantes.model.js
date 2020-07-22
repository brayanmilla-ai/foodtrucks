// Primero obtenemos la clase de la base de datos. (Singleton)
const db = require("../../dao/db");
const ObjectId = require("mongodb").ObjectId;

//variable que contendran punteros hacia las colecciones
let ordenes;

// NOTA: LOS MODELOS DE DATOS SON CLASES QUE CONTIENEN SOLAMENTE METODOS ESTÁTICOS
module.exports = class {
  // initModel
  static async initModel() {
    if (!ordenes) {
      let _db = await db.getDB();
      //console.log(_db);
      ordenes = await _db.collection("ordenes");
      console.log("Coleccion de Ordenes asignados");
      return;
    } else {
      return;
    }
  }
  static async getAll() {
    try {
      if (ordenes) {
        let registro = await ordenes.find();
        return registro.toArray();
      }
      return [];
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /* static async addOne(cuenta, nombre) {
    try {
      const newAlumno = { cuenta: cuenta, nombre: nombre };
      const result = await ordenes.insertOne(newAlumno);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  } */

  static async getOne(id) {
    try {
      let filter = { _id: new ObjectId(id) };
      const result = await ordenes.findOne(filter);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /* static async getByCuenta(cuenta) {
    try {
      let filter = { cuenta: cuenta };
      const result = await ordenes.findOne(filter);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  } //get by Cuenta
 */
  /* static async like(id) {
    try {
      let filter = { _id: new ObjectId(id) };
      let update = {
        $inc: { like: 1 },
        $set: { last_modified: new Date().getTime() },
      };
      const result = await ordenes.updateOne(filter, update);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async dislike(id) {
    try {
      let filter = { _id: new ObjectId(id) };
      let update = {
        $inc: { dislike: 1 },
        $set: { last_modified: new Date().getTime() },
      };
      const result = await ordenes.updateOne(filter, update);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  } */
};
