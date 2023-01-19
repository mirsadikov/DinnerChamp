import Meta from './Meta';
import Header from './Header';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: "400",
});

const Layout = ({ children }) => {
  return (
    <div className={inter.className}>
      <Meta />
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
