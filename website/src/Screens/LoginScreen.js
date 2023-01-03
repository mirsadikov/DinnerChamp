import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Actions/restaurantActions';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.restaurant);
  const { loading, error, info } = user;

  useEffect(() => {
    if (info) {
      navigate('/');
    }
  }, [info, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <Link to="/">Go to Home Screen</Link>
      <h1>Login</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label />
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}
