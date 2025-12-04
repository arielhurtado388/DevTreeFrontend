import { Link } from "react-router-dom";
export default function InicioView() {
  return (
    <nav>
      <Link to={"/auth/registro"}>Registro</Link>
      <Link to={"/auth/iniciar-sesion"}>Iniciar sesion</Link>
    </nav>
  );
}
