export type Usuario = {
  _id: string;
  nombreUsuario: string;
  nombre: string;
  correo: string;
  descripcion: string;
  imagen: string;
  links: string;
};

export type NombreUsuario = Pick<
  Usuario,
  "descripcion" | "nombreUsuario" | "nombre" | "imagen" | "links"
>;

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

export type SocialNetwork = {
  id: number;
  nombre: string;
  url: string;
  habilitada: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, "nombre" | "url" | "habilitada">;
