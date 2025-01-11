import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/homepage/HomePage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import LoginPage from "./pages/loginpage/LoginPage";
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route />
        <Route />
      </Routes>
    </Layout>
  );
};

export default App;
