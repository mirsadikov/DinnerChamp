import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../Actions/restaurantActions';

export default function Header() {
  const [sticky, setSticky] = useState(false);

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <nav className={`header__nav ${sticky ? 'header__nav--sticky' : ''}`}>
        <div className="container">
          <div className="header__logo">
            <h1 className="header__title">
              <Link to="/">DinnerChamp</Link>
            </h1>
            <span className="header__logo-badge mini-badge">Business</span>
          </div>
          <ul className="header__links">
            {info ? (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <Link to="/" onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
