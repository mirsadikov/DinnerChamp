import { useCallback, useContext, useEffect } from 'react';
import dateFormat from 'dateformat';
import axios from '@/config/axios.js';
import { GlobalContext } from '@/globalContext';
import { img_endpoint } from '@/config/variables.js';
import Image from 'next/image';

function Orders() {
  const { auth, setAuthModalOpen, setOrders, orders } = useContext(GlobalContext);

  const getOrders = useCallback(
    async (token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/api/client/orders', config);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    },
    [setOrders]
  );

  useEffect(() => {
    if (!auth?.token) {
      setAuthModalOpen(true);
    } else {
      setAuthModalOpen(false);
    }
  }, [auth, setAuthModalOpen]);

  useEffect(() => {
    if (auth?.token) {
      getOrders(auth.token);
    } else {
      setOrders(null);
    }
  }, [auth?.token, setOrders, getOrders]);

  return (
    <div className="orders">
      <div className="container">
        <div className="orders__header">
          <h1 className="orders__title">My Orders</h1>
          {auth && auth.token && (
            <button
              className="orders__refresh button button--small button--primary"
              onClick={() => getOrders(auth.token)}
            >
              Refresh
            </button>
          )}
        </div>
        {auth && !auth.token && (
          <div className="orders__login">
            <h3>You must be logged in to view your orders</h3>
            <button
              className="orders__login__button button button--secondary"
              onClick={() => setAuthModalOpen(true)}
            >
              Login
            </button>
          </div>
        )}
        {orders?.length > 0 && (
          <div className="orders__list">
            {orders
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => (
                <div className="orders__item" key={order.id}>
                  <div className="orders__item__row">
                    <p className="orders__item__id"># {order.id}</p>
                    <p className="orders__item__date">
                      {dateFormat(order.createdAt, 'dd mmmm HH:MM')}
                    </p>
                  </div>
                  <div className="orders__item__row">
                    <p className="orders__item__restaurant">{order.restaurant.name}</p>
                    <p
                      className={`orders__item__status ${
                        order.status == 'ready' ? 'orders__item__status--ready' : ''
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div className="orders__item__row orders__item__products-row">
                    <div className="orders__item__products">
                      {order.orderDishes
                        .filter((item, index) => order.orderDishes.indexOf(item) === index)
                        .map((item) => (
                          <div className="orders__item__product" key={item.id}>
                            {/* <img
                              className="orders__item__product__img"
                              src={`${img_endpoint}${item.dish.image}`}
                              alt={item.dish.name}
                            /> */}
                            <Image
                              className="orders__item__product__img"
                              src={`${img_endpoint}${item.dish.image}`}
                              alt={item.dish.name}
                              width={30}
                              height={30}
                            />
                          </div>
                        ))}
                    </div>
                    <p className="orders__item__total">{order.total} so&apos;m</p>
                  </div>
                </div>
              ))}
          </div>
        )}
        {orders?.length === 0 && (
          <div className="orders__empty">
            <h3>You have no orders</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
