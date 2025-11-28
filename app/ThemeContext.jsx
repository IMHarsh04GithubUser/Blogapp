"use client";
import { createContext, useState } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setdark] = useState(false);
  const handlebgdark = () => {
    setdark(true);
  };

  const handlebglight = () => {
    setdark(false);
  };

  return (
  <>
    <ThemeContext.Provider value={{ dark, handlebgdark,handlebglight }}>
      {children}
    </ThemeContext.Provider>
  </>
);
}


