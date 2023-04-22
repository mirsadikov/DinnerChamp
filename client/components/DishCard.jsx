import { GlobalContext } from '@/globalContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

export default function DishCard({ dish }) {
  const { setCartIsOpen, cart, setCart } = useContext(GlobalContext);
  const [quantity, setQuantity] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const initialQuantity = cart?.find((item) => item.id === dish.id)?.quantity || 0;
    setQuantity(initialQuantity || 0);
  }, [cart, dish]);

  const increaseQuantity = () => {
    if (windowWidth > 1024) {
      setCartIsOpen(true);
    }
    setQuantity(quantity + 1);

    // add dish to cart
    const dishInCart = cart?.find((item) => item.id === dish.id);
    if (dishInCart) {
      dishInCart.quantity = dishInCart.quantity + 1;

      // update cart
      updateCart(dishInCart);
    }
    if (!dishInCart) {
      dish.quantity = 1;
      setCart([...cart, dish]);
    }
  };

  const reduceQuantity = () => {
    if (windowWidth >= 1024) {
      setCartIsOpen(true);
    }
    if (quantity > 0) {
      setQuantity(quantity - 1);

      // remove dish from cart
      const dishInCart = cart.find((item) => item.id === dish.id);
      if (dishInCart) {
        dishInCart.quantity = dishInCart.quantity - 1;

        if (dishInCart.quantity === 0) {
          const newCart = cart.filter((item) => item.id !== dish.id);
          setCart(newCart);
        } else {
          // update cart
          updateCart(dishInCart);
        }
      }
    }
  };

  const updateCart = (updatedItem) => {
    const newCart = cart.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setCart(newCart);
  };

  return (
    <div className="dish-card" key={dish.id}>
      {/* <img src={dish.img} alt={dish.name} className="dish-card__img" /> */}
      <Image src={dish.img} alt={dish.name} className="dish-card__img" width={150} height={100} />
      <div className="dish-card__details">
        <h3 className="dish-card__title">{dish.name}</h3>
        <p className="dish-card__price">
          {dish.price} <span>so&apos;m</span>
        </p>
        <p className="dish-card__category">{dish.category ? dish.category.name : 'Other'}</p>
        {dish.description && (
          <Tooltip title={dish.description} placement="top" disableInteractive>
            <p className="dish-card__description">{dish.description}</p>
          </Tooltip>
        )}
        <div className="dish-card__buttons">
          <button className="dish-card__button" onClick={reduceQuantity}>
            <RemoveIcon />
          </button>
          <span className="dish-card__quantity">{quantity}</span>
          <button className="dish-card__button" onClick={increaseQuantity}>
            <AddIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
