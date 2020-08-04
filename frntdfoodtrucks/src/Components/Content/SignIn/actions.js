import { paxios } from "../../../utilities/axios";

export const register = async (email, pswd, tipo) => {
  try {
    let { data } = "";
    if (tipo == "restaurante") {
      data = await paxios.post("/api/sec/restaurante/signin", {
        email: email,
        password: pswd,
      });
    } else if (tipo == "repartidor") {
      data = await paxios.post("/api/sec/delivery/signin", {
        email: email,
        password: pswd,
      });
    } else {
      data = await paxios.post("/api/sec/signin", {
        email: email,
        password: pswd,
      });
    }
    return data;
  } catch (e) {
    throw e;
  }
};
