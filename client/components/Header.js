import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Oleo_Script_Swash_Caps } from '@next/font/google';

const oleo = Oleo_Script_Swash_Caps({
  subsets: ['latin'],
  weight: '400',
});

export default function Header() {
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
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/liked">Liked</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
