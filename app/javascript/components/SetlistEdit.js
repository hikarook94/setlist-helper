import React from "react";
import { Routes, Route } from "react-router-dom";
import SetlistSongEdit from "./SetlistSongEdit";
import Repertoire from "./Repertoire";
import { InputValueProvider } from "./InputValueContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

const SetlistEdit = () => {
  return (
    <>
      <div className="h-screen">
        <ToastContainer />
        <InputValueProvider>
          <Routes>
            <Route path="/" element={<SetlistSongEdit />} />
            <Route path="/repertoire" element={<Repertoire />} />
          </Routes>
        </InputValueProvider>
      </div>
    </>
  );
};

export default SetlistEdit;
