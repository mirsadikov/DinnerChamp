import { useState, createContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = function ({ children }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ searchModalOpen, setSearchModalOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext };
