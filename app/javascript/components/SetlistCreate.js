import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SetlistForm from './SetlistForm';
import SetlistSongSelect from './SetlistSongSelect';
import {InputValueProvider} from './InputValueContext';

const SetlistCreate = () => {

  return (
    <>
      <InputValueProvider>
        <Routes>
          <Route path="/" element={<SetlistForm />} />
          <Route path="songs" element={<SetlistSongSelect />} />
        </Routes>
      </InputValueProvider>
    </>
  )
}

export default SetlistCreate;
