import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SignupSuccess from "./pages/SignupSuccess";
import AdminPage from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/dashboard" element={<AdminPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Landingpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
