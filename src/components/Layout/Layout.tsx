import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import NewsletterBar from './NewsletterBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <NewsletterBar />
      <Footer />
    </div>
  );
};

export default Layout;