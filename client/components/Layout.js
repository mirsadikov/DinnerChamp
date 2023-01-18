import Meta from './Meta';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
