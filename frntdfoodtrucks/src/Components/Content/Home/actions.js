import { paxios } from "../../../utilities/axios";

export const obtenerRestaurantes = async () => {
  try {
    let { data } = await paxios.get("/api/restaurantes/all-own");
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};

export const obtenerRestaurantesClientes = async () => {
  try {
    let { data } = await paxios.get("/api/cliente/restaurantes");
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};
