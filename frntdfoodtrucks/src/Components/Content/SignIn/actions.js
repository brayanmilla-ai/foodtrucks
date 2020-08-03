import { paxios } from "../../../utilities/axios";

export const register = async (email, pswd) => {
  try {
    const { data } = await paxios.post("/api/sec/signin", {
      email: email,
      password: pswd,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
