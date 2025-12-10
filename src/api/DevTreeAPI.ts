import { isAxiosError } from "axios";
import api from "../config/axios";
import type { PerfilForm, Usuario } from "../types";

export async function obtenerUsuario() {
  try {
    const { data } = await api<Usuario>("/usuario");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function actualizarPerfil(datosForm: PerfilForm) {
  try {
    const { data } = await api.patch<string>("/usuario", datosForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function subirImagen(imagen: File) {
  let datosForm = new FormData();
  datosForm.append("file", imagen);
  try {
    const {
      data: { imagen },
    }: { data: { imagen: string } } = await api.post(
      "/usuario/imagen",
      datosForm
    );
    return imagen;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
