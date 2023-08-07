import React, { useState, createContext } from 'react';
import SetlistForm from './SetlistForm';

const SetlistCreate = () => {
  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl text-center mb-8">セットリスト新規作成</h1>
      <SetlistForm />
    </div>
    </>
  )
}
export default SetlistCreate
