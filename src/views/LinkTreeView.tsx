import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { esUrlValida } from "../utils";
import { toast } from "sonner";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const actualizarLinks = devTreeLinks.map((link) =>
      link.nombre === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(actualizarLinks);
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
    </div>
  );
}
