import { useState, createContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const GlobalContext = createContext();

const GlobalProvider = function ({ children }) {
  const [auth, setAuth] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState(null);

  // set initial cart state
  useEffect(() => {
    const authFromStorage = JSON.parse(localStorage.getItem('auth'));
    // verify token
    if (authFromStorage?.token) {
      const decodedJwt = jwt_decode(authFromStorage.token);
      if (decodedJwt?.exp * 1000 < Date.now()) {
        localStorage.removeItem('auth');
        setAuth({})
      } else {
        setAuth(authFromStorage);
      }
    } else {
      setAuth({});
    }

    const cartFromStorage = JSON.parse(localStorage.getItem('cart'));
    setCart(cartFromStorage || []);
  }, []);

  // update cart state before unmounting
  useEffect(() => {
    if (cart?.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
    if (cart?.length === 0) localStorage.removeItem('cart');
  }, [cart]);

  useEffect(() => {
    if (auth?.token) localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const reduceItem = (id) => {
    const newCart = [];
    cart.forEach((item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          newCart.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        newCart.push(item);
      }
    });
    setCart(newCart);
  };

  const increaseItem = (id) => {
    const newCart = [];
    cart.forEach((item) => {
      if (item.id === id) {
        newCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        newCart.push(item);
      }
    });
    setCart(newCart);
  };

  return (
    <GlobalContext.Provider
      value={{
        auth,
        setAuth,
        authModalOpen,
        setAuthModalOpen,
        searchModalOpen,
        setSearchModalOpen,
        cartIsOpen,
        setCartIsOpen,
        cart,
        setCart,
        reduceItem,
        increaseItem,
        orders,
        setOrders,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext };
