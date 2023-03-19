import { GlobalContext } from '@/globalContext';
import { useContext } from 'react';

export default function Orders() {
  const { orders } = useContext(GlobalContext);

  return (
    <div className="orders">
      <div className="container">
        <h1 className="orders__header">My Orders</h1>
        {orders?.length > 0 && (
          <div className="orders__list">
            {orders.map((order) => (
              <div className="orders__item" key={order.id}>
                <div className="orders__item__id">
                  <h3>Order ID: {order.id}</h3>
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
