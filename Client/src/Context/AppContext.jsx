/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
   const[products, setProducts]=useState([]);
   const [cart, setCart] = useState(null);
   const [cartCount, setCartCount] = useState(0);
   const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{
      darkMode,
      setDarkMode,
      cartCount,
      setCartCount,
      user,
      setUser,
      products,
      setProducts,
      cart,
      setCart
    }}>
      {children}
    </AppContext.Provider>
  )
}