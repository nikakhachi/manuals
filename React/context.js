import { createContext, useState, useContext } from "react";

export const ContextNameContext = createContext();

export const ContextNameProvider = ({ children }) => {
  const [state, setState] = useState();

  const value = {
    state,
    setState,
  };

  return (
    <ContextNameContext.Provider value={value}>
      {children}
    </ContextNameContext.Provider>
  );
};

const App = () => {
  const { state } = useContext(ContextNameContext);

  return (
    <ContextNameProvider>
      <></>
    </ContextNameProvider>
  );
};
