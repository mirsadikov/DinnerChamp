import { SET_ORDERS, UPDATE_ORDER, SET_SELECTED_ORDER, RESTAURANT_LOGOUT } from '../constants';

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, status: action.payload.status };
          }
          return order;
        }),
        selectedOrder: {
          ...state.selectedOrder,
          status: action.payload.status,
        },
      };
    case SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: action.payload ? action.payload : state.orders[0],
      };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};
