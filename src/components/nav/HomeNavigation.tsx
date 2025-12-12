import { Link } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <>
      <Link
        className="p-2 uppercase font-bold text-xs cursor-pointer bg-lime-500 text-slate-800 rounded-lg"
        to={"/auth/registro"}
      >
        Registrarme
      </Link>
      <Link
        className="text-white p-2 uppercase font-bold text-xs cursor-pointer"
        to={"/auth/iniciar-sesion"}
      >
        Iniciar sesión
      </Link>
    </>
  );
}
