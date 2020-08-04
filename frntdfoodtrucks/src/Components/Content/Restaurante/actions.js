import { paxios } from "../../../utilities/axios";

export const obtenerOrdenes = async () => {
  try {
    let { data } = await paxios.get("/api/restaurantes/ordenes");
    return data;
  } catch (e) {
    throw e;
  }
};

export const aceptarOrden = async (id, tipo) => {
  if (tipo == 1) {
    let url = "/api/restaurantes/aceptar-orden/" + id;
    console.log(url);
    try {
      let { data } = await paxios.put(url);
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  } else if (tipo == 2) {
    let url = "/api/restaurantes/marcar-orden-listo/" + id;
    console.log(url);
    try {
      let { data } = await paxios.put(url);
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
};
