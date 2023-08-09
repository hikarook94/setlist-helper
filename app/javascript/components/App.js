import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Setlist from './Setlist';
import Setlists from './Setlists';
import SetlistForm from './SetlistForm';
import SetlistSongSelect from './SetlistSongSelect';

const App = () => (
  <Routes>
    <Route path="/setlists" element={<Setlists />} />
    <Route path="/setlists/:id" element={<Setlist />} />
    <Route path="/setlists/new" element={<SetlistForm />} />
    <Route path="/setlists/new/songs" element={<SetlistSongSelect />} />
  </Routes>
)

export default App;
