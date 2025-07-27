/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
   const [cartCount, setCartCount] = useState(0);
  return (
    <AppContext.Provider value={{
      darkMode,
      setDarkMode,
      cartCount,
      setCartCount
    }}>
      {children}
    </AppContext.Provider>
  )
}