import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import InputWilayaCity from "./pages/InputWilayaCity";
import axios from 'axios'


//--3 tari9a li ra7 nekhedmou biha fel pfe
//makach nav la 3ndk default page w fiha te9der tro7 l page khdoukhra b link kima hna dert home hiya default (path="/") w fel houme dert link yediik lel about page

function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/InputWilayaCity" element={<InputWilayaCity />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
