import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SetlistForm from './SetlistForm';
import SetlistSongSelect from './SetlistSongSelect';
import {InputValueProvider} from './InputValueContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

const SetlistCreate = () => {

  return (
    <>
      <div className="h-screen">
        <h1 className="text-2xl text-center mb-4 pt-4">セットリスト新規作成</h1>
        <ToastContainer />
        <div className="p-4">
          <InputValueProvider>
            <Routes>
              <Route path="/" element={<SetlistForm />} />
              <Route path="songs" element={<SetlistSongSelect />} />
            </Routes>
          </InputValueProvider>
        </div>
      </div>
    </>
  )
}

export default SetlistCreate;
