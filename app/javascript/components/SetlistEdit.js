import React from "react";
import { Routes, Route } from "react-router-dom";
import SetlistSongEdit from "./SetlistSongEdit";
import Repertoire from "./Repertoire";
import { InputValueProvider } from "./InputValueContext";

const SetlistEdit = () => {
  return (
    <>
      <div className="h-screen">
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
