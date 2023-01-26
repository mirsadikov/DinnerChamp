import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Oleo_Script_Swash_Caps } from '@next/font/google';
import { GlobalContext } from '@/globalContext';
import SearchModal from './SearchModal';

const oleo = Oleo_Script_Swash_Caps({
  subsets: ['latin'],
  weight: '400',
});

export default function Header() {
  const { setSearchModalOpen } = useContext(GlobalContext);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

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
          </ul>
        </div>
      </nav>
      <SearchModal />
    </header>
  );
}
