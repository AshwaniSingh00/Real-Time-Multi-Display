import { Routes, Route, Navigate } from "react-router-dom";
import Controller from "./pages/Controller";
import Display from "./pages/Display";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/controller" replace />} />
      <Route path="/controller" element={<Controller />} />
      <Route path="/display" element={<Display />} />
    </Routes>
  );
}

export default App;
