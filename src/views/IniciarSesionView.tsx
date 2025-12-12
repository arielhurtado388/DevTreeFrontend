import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { LoginForm } from "../types";
import Alerta from "../components/Alerta";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/DevTreeAPI";

export default function IniciarSesionView() {
  const navigate = useNavigate();

  const valoresIniciales: LoginForm = {
    correo: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      localStorage.setItem("AUTH_TOKEN", data);
      toast.success("Autenticado");
      navigate("/admin");
    },
  });

  const handleLogin = (datosForm: LoginForm) => {
    mutate(datosForm);
  };

  return (
    <>
      <h1 className="text-3xl text-white font-bold">Iniciar sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
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
            })}
          />
          {errors.password && <Alerta>{errors.password.message}</Alerta>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar sesión"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to={"/auth/registro"}
        >
          ¿No tienes cuenta? Crea cuenta
        </Link>
      </nav>
    </>
  );
}
