import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./routes/Dashboard";
import { DashboardBeta } from "./routes/DashboardBeta";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/beta" element={<DashboardBeta />} />
      </Routes>
    </BrowserRouter>
  );
}
