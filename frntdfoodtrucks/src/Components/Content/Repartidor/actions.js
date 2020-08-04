import { paxios } from "../../../utilities/axios";

export const obtenerOrdenes = async () => {
  try {
    let { data } = await paxios.get("/api/restaurantes/ordenes");
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};
