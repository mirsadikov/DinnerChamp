import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { login } from '../Actions/restaurantActions';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, info } = useSelector((state) => state.auth);

  useEffect(() => {
    if (info) {
      navigate('/dashboard/');
    }
  }, [info, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="auth">
      <div className="container auth__container">
        <div className="auth__column">
          <h2 className="auth__title">Login:</h2>
          <Link to="/register" className="auth__subtitle align-center hover-right">
            Don't have an account? <ArrowForwardIosIcon />
          </Link>
        </div>
        <div className="auth__column">
          <form className="auth__form form" onSubmit={handleLogin}>
            {error && (
              <Alert className="auth__alert" severity="error">
                {error}
              </Alert>
            )}
            <div className="auth__form-group form__group">
              <label className="auth__form-label form__label" htmlFor="email">
                Email Address
              </label>
              <input
                className="auth__form-control form__control"
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth__form-group form__group">
              <label className="auth__form-label form__label" htmlFor="password">
                Password
              </label>
              <input
                className="auth__form-control form__control"
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth__form-group form__group">
              <LoadingButton loading={loading} type="submit" className="button button--primary">
                Sign In
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
