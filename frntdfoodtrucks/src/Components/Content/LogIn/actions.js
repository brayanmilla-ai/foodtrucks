import { paxios } from "../../../utilities/axios";

export const login = async (email, pswd) => {
  try {
    const { data } = await paxios.post("/api/sec/login", {
      email: email,
      pswd: pswd,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
