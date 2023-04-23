import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { EMPLOYEE_LOGOUT } from '../constants.js';

const parseJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.employee);

  useEffect(() => {
    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt?.exp * 1000 < Date.now()) {
        dispatch({ type: EMPLOYEE_LOGOUT });
      }
    }
  }, [dispatch, token]);

  return;
};

export default AuthVerify;
