import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import { Inter, Oleo_Script_Swash_Caps } from '@next/font/google';
import { GlobalContext } from '@/globalContext';
import SearchModal from './SearchModal';
import AuthModal from './AuthModal';
import { ClickAwayListener, Popper } from '@mui/material';

const oleo = Oleo_Script_Swash_Caps({
  subsets: ['latin'],
  weight: '400',
});

const inter = Inter({
  subsets: ['latin'],
});

export default function Header() {
  const { setSearchModalOpen, setAuthModalOpen, auth, setAuth } = useContext(GlobalContext);
  const [sticky, setSticky] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  const handleProfileClick = (e) => {
    if (auth.token) {
      setAnchorEl(e.currentTarget);
    } else {
      setAuthModalOpen(true);
    }
  };

  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem('auth');
    setAuth({});
  };

  return (
    <header className="header">
      <nav className={`header__nav ${sticky ? 'header__nav--sticky' : ''}`}>
        <div className="container">
          <div className="header__logo">
            <h1 className={`header__title ${oleo.className}`}>
              <Link href="/">DinnerChamp</Link>
            </h1>
            <span className="header__logo-badge mini-badge">Orders</span>
          </div>
          <ul className="header__links">
            <li>
              <button
                className="header__search-btn button button--small"
                onClick={() => setSearchModalOpen(true)}
              >
                Search
              </button>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>
              <button
                className={`header__profile-btn button button--small ${
                  auth?.token ? 'button--secondary' : ''
                }`}
                onClick={handleProfileClick}
              >
                <PersonIcon />
              </button>
              {auth?.token && (
                <Popper
                  className={`${inter.className} header__profile-popup`}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  anchorEl={anchorEl}
                  placement="bottom-end"
                >
                  <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                    <div className="header__profile-popup-box">
                      <h3>+{auth.number}</h3>
                      <button onClick={logout} className="button button--small button--secondary">
                        Logout
                      </button>
                    </div>
                  </ClickAwayListener>
                </Popper>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <SearchModal />
      <AuthModal />
    </header>
  );
}
