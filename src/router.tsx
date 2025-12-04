import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroView from "./views/RegistroView";
import IniciarSesionView from "./views/IniciarSesionView";
import InicioView from "./views/InicioView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<InicioView />} index />
          <Route path="/auth/registro" element={<RegistroView />} />
          <Route path="/auth/iniciar-sesion" element={<IniciarSesionView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
