import { useState, createContext, useEffect } from 'react';

const GlobalContext = createContext();

const GlobalProvider = function ({ children }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // set initial cart state
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setCart(cart);
    }
  }, []);

  // update cart state before unmounting
  useEffect(() => {
    if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <GlobalContext.Provider
      value={{ searchModalOpen, setSearchModalOpen, cartIsOpen, setCartIsOpen, cart, setCart }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext };
