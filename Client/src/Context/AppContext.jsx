/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}