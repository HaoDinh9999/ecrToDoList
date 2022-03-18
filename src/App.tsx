/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import EditPost from "./page/EditPost";
import Navbar from "./component/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
