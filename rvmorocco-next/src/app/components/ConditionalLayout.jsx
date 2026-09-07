'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

// Routes that should NOT show the public header/footer
const NO_LAYOUT_ROUTES = ['/Dashboard', '/dashboard', '/', '/booking', '/search'];

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = NO_LAYOUT_ROUTES.some((route) =>
    route === '/' ? pathname === '/' : pathname?.startsWith(route)
  );

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
