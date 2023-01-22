import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from '@/globalContext';
import { useContext, useEffect, useState } from 'react';

export default function Cart({ restaurantId }) {
  const [currentCart, setCurrentCart] = useState([]);
  const { cartIsOpen, setCartIsOpen, cart, setCart } = useContext(GlobalContext);

  useEffect(() => {
    const currentCart = cart.filter((item) => item.restaurantId === restaurantId);
    setCurrentCart(currentCart);
  }, [cart, restaurantId]);

  return (
    <Slide direction="left" in={cartIsOpen} mountOnEnter unmountOnExit>
      <div className="cart">
        <div className="cart__container">
          <div className="cart__header">
            <h3 className="cart__title">Cart</h3>
            <button
              className="cart__close-btn button button--primary"
              onClick={() => setCartIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="cart__content">
            {currentCart.length > 0 ? (
              currentCart.map((item) => (
                <div className="cart__item" key={item.id}>
                  <div className="cart__item__image">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="cart__item__details">
                    <h4 className="cart__item__name">
                      {item.name} <span>- x{item.quantity}</span>
                    </h4>
                    <p className="cart__item__price">{item.price * item.quantity} <span>so'm</span></p>
                  </div>
                </div>
              ))
            ) : (
              <p className="cart__empty">Your cart is empty</p>
            )}
          </div>
          <div className="cart__actions">
            <h3 className="cart__total">
              {currentCart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
              }, 0)} so'm
            </h3>
            <button className="cart__checkout-btn button button--small">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
}
