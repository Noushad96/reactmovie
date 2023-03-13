import React from "react";
import Home from "./components/home";
import SingleMovie from "./components/singleMovie";
import Error from "./components/Error";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<SingleMovie />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
