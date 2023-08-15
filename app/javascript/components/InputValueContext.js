import React, { createContext, useState } from 'react';

const InputValueContext = createContext();

export const InputValueProvider = ({ children }) => {
  const [inputValues, setInputValues] = useState({
    song_ids: [],
    songs: [],
    total_duration_time: 0,
    total_hours: 0,
    total_minutes: 0,
  });
  const value = [inputValues, setInputValues];

  return (
    <InputValueContext.Provider value={value}>
      {children}
    </InputValueContext.Provider>
  );
};

export const useInputValue = () => {
  const context = React.useContext(InputValueContext);
  if (context === undefined) {
    throw new Error(
      "useInputValue must be used within a InputValueContextProvider",
    );
  }
  return context;
};

export const useUpdateInputValue = () => {
  const [ inputValues, setInputValues ] = React.useContext(InputValueContext);

  const updateInputValue = (newData) => {
    setInputValues(prevState => ({
      ...prevState,
      ...newData
    }))
  }
  return updateInputValue;
}
