import React, {createContext, useContext, useState} from 'react';
import {PixelRatio} from 'react-native';

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
const AppProvider = ({children}) => {
  const pixelRatio = PixelRatio.get();
  return (
    <AppContext.Provider value={{pixelRatio}}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
