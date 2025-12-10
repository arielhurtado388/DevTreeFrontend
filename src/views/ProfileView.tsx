import { useForm } from "react-hook-form";
import Alerta from "../components/Alerta";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PerfilForm, Usuario } from "../types";
import { actualizarPerfil, subirImagen } from "../api/DevTreeAPI";
import { toast } from "sonner";
import type { ChangeEvent } from "react";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: Usuario = queryClient.getQueryData(["usuario"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PerfilForm>({
    defaultValues: {
      nombreUsuario: data.nombreUsuario,
      descripcion: data.descripcion,
    },
  });

  const actualizarPerfilMutation = useMutation({
    mutationFn: actualizarPerfil,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["usuario"] });
    },
  });

  const subirImagenMutation = useMutation({
    mutationFn: subirImagen,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["usuario"], (prevData: Usuario) => {
        return {
          ...prevData,
          imagen: data,
        };
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      subirImagenMutation.mutate(e.target.files[0]);
    }
  };

  const handlePerfilForm = (datosForm: PerfilForm) => {
    actualizarPerfilMutation.mutate(datosForm);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handlePerfilForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="nombreUsuario">Usuario</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Nombre de usuario"
          {...register("nombreUsuario", {
            required: "El usuario es obligatorio",
          })}
        />
        {errors.nombreUsuario && (
          <Alerta>{errors.nombreUsuario.message}</Alerta>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu descripción"
          {...register("descripcion", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.descripcion && <Alerta>{errors.descripcion.message}</Alerta>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="imagen">Imagen</label>
        <input
          id="imagen"
          type="file"
          name="imagen"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar cambios"
      />
    </form>
  );
}
