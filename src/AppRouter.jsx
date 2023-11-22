//Rutas de la aplicación
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreateClients } from "./components/CreateClients";
import { EditClients } from "./components/EditClients";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clientes" element={<CreateClients />} />
      <Route path="/clientes/:id" element={<EditClients />} />
    </Routes>
  );
};
