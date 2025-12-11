import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { esUrlValida } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarPerfil } from "../api/DevTreeAPI";
import type { SocialNetwork, Usuario } from "../types";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const usuario: Usuario = queryClient.getQueryData(["usuario"])!;

  const { mutate } = useMutation({
    mutationFn: actualizarPerfil,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  useEffect(() => {
    const actualizarDatos = devTreeLinks.map((item) => {
      const linkUsuario = JSON.parse(usuario.links).find(
        (link: SocialNetwork) => link.nombre === item.nombre
      );
      if (linkUsuario) {
        return {
          ...item,
          url: linkUsuario.url,
          habilitada: linkUsuario.habilitada,
        };
      }
      return item;
    });
    setDevTreeLinks(actualizarDatos);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const actualizarLinks = devTreeLinks.map((link) =>
      link.nombre === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(actualizarLinks);
    queryClient.setQueryData(["usuario"], (prevData: Usuario) => {
      return {
        ...prevData,
        links: JSON.stringify(actualizarLinks),
      };
    });
  };

  const handleLinkHabilitado = (sociaNetwork: string) => {
    const actualizarLinks = devTreeLinks.map((link) => {
      if (link.nombre === sociaNetwork) {
        if (esUrlValida(link.url)) {
          return { ...link, habilitada: !link.habilitada };
        } else {
          toast.error("URL no válida");
        }
      }
      return link;
    });
    setDevTreeLinks(actualizarLinks);
    queryClient.setQueryData(["usuario"], (prevData: Usuario) => {
      return {
        ...prevData,
        links: JSON.stringify(actualizarLinks),
      };
    });
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.nombre}
          item={item}
          handleUrlChange={handleUrlChange}
          handleLinkHabilitado={handleLinkHabilitado}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
        onClick={() => mutate(usuario)}
      >
        Guardar cambios
      </button>
    </div>
  );
}
