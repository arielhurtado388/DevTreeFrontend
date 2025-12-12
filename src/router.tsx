import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroView from "./views/RegistroView";
import IniciarSesionView from "./views/IniciarSesionView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/registro" element={<RegistroView />} />
          <Route path="/auth/iniciar-sesion" element={<IniciarSesionView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTreeView />} />
          <Route path="perfil" element={<ProfileView />} />
        </Route>

        <Route path="/:nombreUsuario" element={<AuthLayout />}>
          <Route element={<HandleView />} index={true} />
        </Route>

        <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
