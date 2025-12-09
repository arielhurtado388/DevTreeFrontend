export type Usuario = {
  _id: string;
  nombreUsuario: string;
  nombre: string;
  correo: string;
  descripcion: string;
};

export type RegistroForm = Pick<
  Usuario,
  "nombreUsuario" | "nombre" | "correo"
> & {
  password: string;
  confirmacion_password: string;
};

export type LoginForm = Pick<Usuario, "correo"> & {
  password: string;
};

export type PerfilForm = Pick<Usuario, "nombreUsuario" | "descripcion">;
