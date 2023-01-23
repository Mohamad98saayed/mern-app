import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./state/store";

import Navbar from "./layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";

import { useEffect } from "react";
import { getCurrentAsync } from "./state/reducers/user";

function App() {
  useEffect(() => {
    store.dispatch(getCurrentAsync());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
