/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
   const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider value={{
      darkMode,
      setDarkMode,
    }}>
      {children}
    </AppContext.Provider>
  )
}