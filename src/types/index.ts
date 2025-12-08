export type Usuario = {
  nombreUsuario: string;
  nombre: string;
  correo: string;
};

export type RegistroForm = Pick<
  Usuario,
  "nombreUsuario" | "nombre" | "correo"
> & {
  password: string;
  confirmacion_password: string;
};
