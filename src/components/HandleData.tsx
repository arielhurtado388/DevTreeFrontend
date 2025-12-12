import type { NombreUsuario, SocialNetwork } from "../types";

type HandleDataProps = {
  data: NombreUsuario;
};

export default function HandleData({ data }: HandleDataProps) {
  const activos: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.habilitada
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-3xl text-center font-black">{data.nombreUsuario}</p>
      {data.imagen && (
        <img
          className="max-w-[250px] mx-auto"
          src={data.imagen}
          alt="Imagen del usuario"
        />
      )}
      <p className="text-lg text-center font-bold">{data.descripcion}</p>

      <div className="mt-20 flex flex-col gap-6">
        {activos.length ? (
          activos.map((link) => (
            <a
              key={link.nombre}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="w-12"
                src={`/social/icon_${link.nombre}.svg`}
                alt="Logo red social"
              />
              <p className="text-black">
                Sígueme en:{" "}
                <span className="capitalize font-bold">{link.nombre}</span>
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">No hay enlaces en este perfil</p>
        )}
      </div>
    </div>
  );
}
