import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { obtenerUsuarioPorHandle } from "../api/DevTreeAPI";
import HandleData from "../components/HandleData";

export default function HandleView() {
  const params = useParams();
  const nombreUsuario = params.nombreUsuario!;

  const { data, isLoading, isError } = useQuery({
    queryFn: () => obtenerUsuarioPorHandle(nombreUsuario),
    queryKey: ["nombreUsuario", nombreUsuario],
    retry: 1,
  });

  if (isLoading) return "Cargando...";

  if (isError) return <Navigate to={"/404"} />;

  if (data) return <HandleData data={data} />;
}
