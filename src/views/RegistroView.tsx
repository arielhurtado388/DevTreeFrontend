import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alerta from "../components/Alerta";
import type { RegistroForm } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";

export default function RegistroView() {
  const valoresIniciales: RegistroForm = {
    nombre: "",
    correo: "",
    nombreUsuario: "",
    password: "",
    confirmacion_password: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const password = watch("password");

  const handleRegistro = async (datosForm: RegistroForm) => {
    try {
      const { data } = await api.post("/auth/registro", datosForm);
      toast.success(data);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl text-white font-bold">Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegistro)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="nombre" className="text-lg text-slate-500">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.nombre && <Alerta>{errors.nombre.message}</Alerta>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="correo" className="text-lg text-slate-500">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            placeholder="Correo de registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "El correo no es válido",
              },
            })}
          />
          {errors.correo && <Alerta>{errors.correo.message}</Alerta>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="nombreUsuario" className="text-lg text-slate-500">
            Usuario
          </label>
          <input
            id="nombreUsuario"
            type="text"
            placeholder="Nombre de usuario sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("nombreUsuario", {
              required: "El usuario es obligatorio",
            })}
          />
          {errors.nombreUsuario && (
            <Alerta>{errors.nombreUsuario.message}</Alerta>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-lg text-slate-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && <Alerta>{errors.password.message}</Alerta>}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="confirmacion_password"
            className="text-lg text-slate-500"
          >
            Repetir contraseña
          </label>
          <input
            id="confirmacion_password"
            type="password"
            placeholder="Repetir contraseña"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("confirmacion_password", {
              required: "Repetir contraseña es obligatorio",
              validate: (value) =>
                value === password || "Las contraseñas no son iguales",
            })}
          />
          {errors.confirmacion_password && (
            <Alerta>{errors.confirmacion_password.message}</Alerta>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to={"/auth/iniciar-sesion"}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
}
