import { isAxiosError } from "axios";
import api from "../config/axios";
import type { LoginForm, NombreUsuario, RegistroForm, Usuario } from "../types";

export async function registro(datosForm: RegistroForm) {
  try {
    const { data } = await api.post<string>("/auth/registro", datosForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function login(datosForm: LoginForm) {
  try {
    const { data } = await api.post("/auth/iniciar-sesion", datosForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

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

export async function actualizarPerfil(datosForm: Usuario) {
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

export async function obtenerUsuarioPorHandle(nombreUsuario: string) {
  try {
    const { data } = await api<NombreUsuario>(`/${nombreUsuario}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function buscarPorHandle(nombreUsuario: string) {
  try {
    const { data } = await api.post<string>("/buscar", { nombreUsuario });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
