import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Setlist from './Setlist';
import Setlists from './Setlists';
import SetlistCreate from './SetlistCreate';
import SetlistForm from './SetlistForm';

const App = () => (
  <Routes>
    <Route path="/setlists" element={<Setlists />} />
    <Route path="/setlists/:id" element={<Setlist />} />
    <Route path="/setlists/new" element={<SetlistCreate />}>
      <Route path="form" element={<SetlistForm />} />
    </Route>
  </Routes>
)

export default App;
