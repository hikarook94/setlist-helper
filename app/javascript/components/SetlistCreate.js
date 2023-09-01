import React from "react";
import { Routes, Route } from "react-router-dom";
import SetlistForm from "./SetlistForm";
import SetlistSongSelect from "./SetlistSongSelect";
import Repertoire from "./Repertoire";
import { InputValueProvider } from "./InputValueContext";

const SetlistCreate = () => {
  return (
    <>
      <div className="h-screen">
        <h1 className="text-2xl text-center mb-2 pt-6">セットリスト新規作成</h1>
        <div className="p-4 h-3/5">
          <InputValueProvider>
            <Routes>
              <Route path="/" element={<SetlistForm />} />
              <Route path="songs" element={<SetlistSongSelect />} />
              <Route path="songs/repertoire" element={<Repertoire />} />
            </Routes>
          </InputValueProvider>
        </div>
      </div>
    </>
  );
};

export default SetlistCreate;
