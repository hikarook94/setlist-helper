import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Setlists from './Setlists';

const App = () => (
  <Routes>
    <Route path="setlists/*" element={<Setlists />} />
  </Routes>
)

export default App;
