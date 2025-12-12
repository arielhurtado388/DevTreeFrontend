import { useForm } from "react-hook-form";
import Alerta from "./Alerta";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { buscarPorHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";

export default function Buscador() {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      nombreUsuario: "",
    },
  });

  const nombreUsuario = watch("nombreUsuario");

  const mutation = useMutation({
    mutationFn: buscarPorHandle,
  });

  const handleBusqueda = () => {
    const slug = slugify(nombreUsuario);
    mutation.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleBusqueda)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="nombreUsuario">devtree.com/</label>
        <input
          type="text"
          id="nombreUsuario"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("nombreUsuario", {
            required: "El nombre de usuario es obligatorio",
          })}
        />
      </div>
      {errors.nombreUsuario && <Alerta>{errors.nombreUsuario.message}</Alerta>}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando...</p>}
        {mutation.error && (
          <p className="text-center text-red-600 font-black">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-cyan-500 font-black">
            {mutation.data} ir a{" "}
            <Link
              to={"/auth/registro"}
              state={{ nombreUsuario: slugify(nombreUsuario) }}
            >
              registro
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Obtener mi devtree"
      />
    </form>
  );
}
