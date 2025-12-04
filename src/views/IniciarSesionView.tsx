import { Link } from "react-router-dom";

export default function IniciarSesionView() {
  return (
    <>
      <h1 className="text-3xl text-white font-bold">Iniciar sesión</h1>

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
