import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

import EditPasswordDialog from "./editp";

//--3 tari9a li ra7 nekhedmou biha fel pfe
//makach nav la 3ndk default page w fiha te9der tro7 l page khdoukhra b link kima hna dert home hiya default (path="/") w fel houme dert link yediik lel about page

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Hello world!</h1> */}
          {/* Define your routes here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
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
