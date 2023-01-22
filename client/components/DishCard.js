import { GlobalContext } from '@/globalContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from 'react';

export default function DishCard({ dish, initialQuantity = 0 }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const { setCartIsOpen, cart, setCart } = useContext(GlobalContext);

  const increaseQuantity = () => {
    setCartIsOpen(true);
    setQuantity(quantity + 1);

    // add dish to cart
    const dishInCart = cart.find((item) => item.id === dish.id);
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
    setCartIsOpen(true);
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
      <img src={dish.img} alt={dish.name} className="dish-card__img" />
      <div className="dish-card__details">
        <h3 className="dish-card__title">{dish.name}</h3>
        <p className="dish-card__price">
          {dish.price} <span>so'm</span>
        </p>
        <p className="dish-card__category">{dish.category ? dish.category.name : 'Other'}</p>
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
