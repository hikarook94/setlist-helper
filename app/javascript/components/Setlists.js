import React from 'react';
import { Routes, Route } from 'react-router-dom'
import SetlistsViewer from './SetlistsViewer';
import SetlistViewer from './SetlistViewer';

const Setlists = () => {

  return (
    <>
      <h1 className="text-4xl">セットリスト</h1>
      <Routes>
        <Route path="" element={<SetlistsViewer />} />
        <Route path="/:id" element={<SetlistViewer />} />
      </Routes>
    </>
  );
};

export default Setlists;
