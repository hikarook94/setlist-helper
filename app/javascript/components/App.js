import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Setlist from './Setlist';
import Setlists from './Setlists';
import SetlistCreate from './SetlistCreate';


const App = () => {

  return (
    <Routes>
      <Route path="/setlists" element={<Setlists />} />
      <Route path="/setlists/:id" element={<Setlist />} />
      <Route path="/setlists/new/*" element={<SetlistCreate />} />
    </Routes>
  )
}

export default App;
