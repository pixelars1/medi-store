/* eslint-disable react-refresh/only-export-components */
import { getProducts } from "@/api/productApi";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

   const[products, setProducts]=useState([]);
   const [user, setUser] = useState(null);

     // ✅ Fetch products from backend and save in AppContext
     useEffect(() => {
       const fetchProducts = async () => {
         try {
           const data = await getProducts();
           setProducts(data);
         } catch (err) {
           console.error("Error fetching products:", err);
           setProducts([]); // fallback empty
         }
       };
       fetchProducts();
     }, [setProducts]);
   
  return (
    <AppContext.Provider value={{
      user,
      setUser,
      products,
      setProducts,
    }}>
      {children}
    </AppContext.Provider>
  )
}