import { isAxiosError } from "axios";
import api from "../config/axios";

export async function obtenerUsuario() {
  try {
    const { data } = await api("/usuario");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
