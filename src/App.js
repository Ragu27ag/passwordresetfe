import "./App.css";
import Verify from "./Components/Verify";
import Forgot from "./Pages/Forgot";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reset from "./Pages/Reset";
import Success from "./Pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/ver" element={<Verify />} />
        <Route path="/res" element={<Reset />} />
        <Route path="/suc" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
