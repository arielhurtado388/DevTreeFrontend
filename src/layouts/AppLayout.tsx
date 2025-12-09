import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerUsuario } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: obtenerUsuario,
    queryKey: ["usuario"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to={"/auth/iniciar-sesion"} />;
  }
  if (data) return <DevTree data={data} />;
}
