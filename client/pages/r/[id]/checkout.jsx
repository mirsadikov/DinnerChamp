import { GlobalContext } from '@/globalContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Alert, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '@/config/axios.js';
import { img_endpoint } from '@/config/variables.js';
import defaultImage from '@/images/default-img.png';

export default function Checkout({ restaurant }) {
  const [error, setError] = useState(null);
  const [currentCart, setCurrentCart] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitTriggered, setSubmitTriggered] = useState(false);
  const { cart, setCart, increaseItem, reduceItem, auth, setAuthModalOpen } =
    useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    const currentCart = cart?.filter((item) => item.restaurantId === parseInt(restaurant.id));

    if (currentCart?.length === 0 && !submitTriggered) {
      router.push(`/r/${restaurant.id}`);
      return;
    }

    const total = currentCart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(total);

    setCurrentCart(currentCart || []);
  }, [cart, restaurant.id, submitTriggered, router]);

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (!auth.token) {
      setAuthModalOpen(true);
      return;
    }

    setSubmitTriggered(true);
    setLoading(true);
    try {
      const order = {
        restaurantId: restaurant.id,
        ordererName: name,
        comment,
        orderDishes: currentCart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post('/api/order/create', order, config);

      // clear cart of current restaurant
      setLoading(false);
      setCart((prev) => prev.filter((item) => item.restaurantId !== parseInt(restaurant.id)));
      router.push(`/orders`);
    } catch (error) {
      if (error.response?.status === 401) {
        setAuth({ token: null, number: null });
      }
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container checkout-page__container">
        <h3 className="checkout-page__header">Cart Items</h3>
        <div className="checkout-page__content">
          <div className="cart">
            {currentCart && (
              <div className="cart__content">
                {currentCart.map((item) => (
                  <div className="cart__item" key={item.id}>
                    <div className="cart__item__image">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="cart__item__details">
                      <h4 className="cart__item__name">{item.name}</h4>
                      {item.description && (
                        <p className="cart__item__description">{item.description}</p>
                      )}
                    </div>
                    <div className="cart__item__right">
                      <div className="cart__item__actions">
                        <IconButton
                          className="cart__item__btn button button--small"
                          onClick={() => reduceItem(item.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <div className="cart__item__quantity">{item.quantity}</div>
                        <IconButton
                          className="cart__item__btn button button--small"
                          onClick={() => increaseItem(item.id)}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <div className="cart__item__price">
                        {item.price} <span>so&apos;m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="checkout-page__sidebar sidebar">
            <h3 className="sidebar__header">
              <p>Total:</p>
              <p>{restaurant.name}</p>
            </h3>
            {error && <Alert severity="error">{error}</Alert>}
            <form className="sidebar__form" onSubmit={handeSubmit}>
              <div className="sidebar__input">
                <label htmlFor="name" className="sidebar__label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  id="name"
                  className="sidebar__name"
                  placeholder="Orderer name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="sidebar__input">
                <label htmlFor="comment" className="sidebar__label">
                  Comment
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  placeholder="Type your comment"
                  className="sidebar__comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
              </div>
              <hr className="sidebar__divider" />
              <p className="sidebar__total">
                <span>To pay:</span>
                <span>{total} so&apos;m</span>
              </p>
              <LoadingButton loading={loading} className="sidebar__button button" type="submit">
                Send order
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const restaurant = (await axios.get('/api/restaurant/' + params.id)).data;
    return {
      props: {
        restaurant: {
          ...restaurant,
          img: restaurant.img ? `${img_endpoint}/${restaurant.img}` : defaultImage.src,
        },
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}
