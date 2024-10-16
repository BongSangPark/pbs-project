import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AxiosQuery from "./reactquerytest/AxiosQuery";
import Header from "./reactquerytest/Header";
import { Home } from "./reactquerytest/Home";
import ReactQuery from "./reactquerytest/ReactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const ReactQueryTest = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/axios-query" element={<AxiosQuery />} />
          <Route path="/react-query" element={<ReactQuery />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </BrowserRouter>
    </div>
  );
};

export default ReactQueryTest;
