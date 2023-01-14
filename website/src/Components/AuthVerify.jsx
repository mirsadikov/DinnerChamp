import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RESTAURANT_LOGOUT } from '../constants';
import jwt_decode from 'jwt-decode';

const parseJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);

  useEffect(() => {
    if (info) {
      const decodedJwt = parseJwt(info.token);

      if (decodedJwt?.exp * 1000 < Date.now()) {
        localStorage.removeItem('auth');
        dispatch({ type: RESTAURANT_LOGOUT });
      }
    }
  }, [location, dispatch, info]);

  return;
};

export default AuthVerify;
