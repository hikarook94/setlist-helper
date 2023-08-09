import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom'
import Setlist from './Setlist';
import Setlists from './Setlists';
import SetlistForm from './SetlistForm';
import SetlistSongSelect from './SetlistSongSelect';
import {InputValueContext} from './InputValueContext';


const App = () => {
  const [inputValues, setInputValues] = useState();

  return (
    <Routes>
      <Route path="/setlists" element={<Setlists />} />
      <Route path="/setlists/:id" element={<Setlist />} />
      <Route path="/setlists/new" element={
        <InputValueContext.Provider value={{inputValues, setInputValues}}>
          <SetlistForm />
        </InputValueContext.Provider>
      } />
      <Route path="/setlists/new/songs" element={
        <InputValueContext.Provider value={{inputValues, setInputValues}}>
          <SetlistSongSelect />
        </InputValueContext.Provider>
      } />
    </Routes>
  )
}

export default App;
