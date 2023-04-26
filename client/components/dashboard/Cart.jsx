import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from '@/globalContext';
import { useContext, useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/router';
import { Button, IconButton } from '@mui/material';
import Image from 'next/image';

export default function Cart({ restaurant }) {
  const [currentCart, setCurrentCart] = useState([]);
  const { cartIsOpen, setCartIsOpen, cart, reduceItem, openBranches, selectedBranch } =
    useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    const currentCart = cart?.filter((item) => item.restaurantId === restaurant.id);
    setCurrentCart(currentCart || []);

    if (currentCart?.length === 0) {
      setCartIsOpen(false);
    }
  }, [cart, restaurant, setCartIsOpen]);

  return (
    <Slide direction="left" in={cartIsOpen}>
      <div className="cart">
        <div className="cart__container">
          <div className="cart__header">
            <h3 className="cart__title">Cart</h3>
            <IconButton
              color="secondary"
              className="cart__close-btn button button--primary"
              onClick={() => setCartIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="cart__content">
            {currentCart.length > 0 ? (
              currentCart.map((item) => (
                <div className="cart__item" key={item.id}>
                  <div className="cart__item__image">
                    <Image src={item.img} alt={item.name} height={50} width={50} />
                  </div>
                  <div className="cart__item__details">
                    <h4 className="cart__item__name">
                      {item.name} <span>- x{item.quantity}</span>
                    </h4>
                    <p className="cart__item__price">
                      {item.price * item.quantity} <span>so&apos;m</span>
                    </p>
                  </div>
                  <IconButton
                    className="cart__item__remove-btn button button--small"
                    onClick={() => reduceItem(item.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))
            ) : (
              <p className="cart__empty">Your cart is empty</p>
            )}
          </div>
          <div className="cart__actions">
            <h4>{selectedBranch?.name ? selectedBranch.name : 'Select branch'}</h4>
            <div className="cart__actions-bottom">
              <h3 className="cart__total">
                {currentCart.reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0)}{' '}
                so&apos;m
              </h3>
              <Button
                className="cart__checkout-btn button button--small"
                disabled={
                  currentCart.length === 0 ||
                  openBranches.branches.length === 0 ||
                  selectedBranch === null
                }
                onClick={() => router.push(`/r/${restaurant.id}/checkout`)}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
