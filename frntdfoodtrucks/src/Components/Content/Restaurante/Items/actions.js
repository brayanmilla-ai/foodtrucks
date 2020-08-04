import { paxios } from "../../../../utilities/axios";

export const obtenerProductos = async (url) => {
  var apiUrl = "/api/restaurantes" + url;
  try {
    let { data } = await paxios.get(apiUrl);
    return data;
  } catch (e) {
    throw e;
  }
};
