import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EMPLOYEE_LOGOUT } from '../constants.js';

const parseJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch {
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
};

export default AuthVerify;
