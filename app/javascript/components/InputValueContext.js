import React, { createContext, useState } from "react";

const InputValueContext = createContext();

export const InputValueProvider = ({ children }) => {
  const [inputValues, setInputValues] = useState({
    song_ids: [],
    total_duration_time: 0,
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
  const [inputValues, setInputValues] = React.useContext(InputValueContext);

  const updateInputValue = (key, newValue) => {
    setInputValues((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };
  return updateInputValue;
};
