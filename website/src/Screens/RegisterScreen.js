import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../Actions/restaurantActions';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.restaurantRegister);
  const { loading, error, info } = user;

  useEffect(() => {
    if (info) {
      navigate('/dashboard');
    }
  }, [info, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="auth">
      <div className="container auth__container">
        <div className="auth__column auth__column--left">
          <h2 className="auth__title">Register:</h2>
          <Link to="/login" className="auth__subtitle align-center hover-right">
            Already have an account? <ArrowForwardIosIcon />
          </Link>
        </div>
        <div className="auth__column">
          <form className="auth__form" onSubmit={handleRegister}>
            {error && (
              <Alert className="auth__alert" severity="error">
                {error}
              </Alert>
            )}
            <div className="auth__form-group">
              <label className="auth__form-label" htmlFor="name">
                Business Name
              </label>
              <input
                className="auth__form-control"
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="auth__form-group">
              <label className="auth__form-label" htmlFor="email">
                Email Address
              </label>
              <input
                className="auth__form-control"
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth__form-group">
              <label className="auth__form-label" htmlFor="password">
                Password
              </label>
              <input
                className="auth__form-control"
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth__form-group">
              <label className="auth__form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="auth__form-control"
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="auth__form-group">
              <LoadingButton loading={loading} type="submit" className="button button--primary">
                Sign Up
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
